/// <reference types="cypress" />

describe("add rooms", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:8080/login");
  // });

  // config
  const postURL = "http://localhost:3031/data/c_products";

  it("should login", () => {
    const email = "test@test.com";
    const password = "!123456789";

    cy.visit("http://localhost:8080/login");
    cy.get("[name='email']").type(email);
    cy.get("[name='password']").type(password);
    cy.contains("Login").click();
  });

  it("should create room", () => {
    const hotelNameToSearch = "Colmeal";
    const roomSKU = "Quarto de teste";
    const roomName = "Quarto de teste";
    const roomPrice = "75";
    const roomQuantity = "10";
    const roomDescription = "Descrição do quarto de teste";
    const roomImageFilename = "room-image.jpeg";
    const amenityValues = ["ar_condicionado", "micro_ondas"];
    const rooms = [
      { type: "Single", quantity: 1 },
      { type: "Double", quantity: 2 },
      { type: "Sofa", quantity: 1 },
    ];
    const adultCapacity = "2";
    const childrenCapacity = "2";
    const coworkerDiscount = "15";
    const coworkerExclusive = false;

    cy.get(".mdi-hotel").click();
    cy.get("[data-test-id='pesquisa']").type(hotelNameToSearch);
    cy.contains(hotelNameToSearch).click();
    cy.contains("Oferta").click();
    cy.contains("Criar").click();
    cy.get("[data-test-id='sku']").type(roomSKU);
    cy.get("[data-test-id='name']").type(roomName);
    cy.contains("Preço").siblings("input").type(roomPrice);
    cy.contains("Português").siblings("textarea").type(roomDescription);

    // add photos

    cy.contains("Quantidade").siblings("input").type(roomQuantity);

    cy.get('[type="file"]').attachFile(roomImageFilename);
    // select amenities

    // all the following {force: true} are there because cypress believes these elements are covered by another element
    amenityValues.forEach((value) =>
      cy.get("[type='checkbox']").check(value, { force: true })
    );

    rooms.forEach((room, index) => {
      cy.get("[data-test-id='type-selection']")
        .eq(index)
        .click({ force: true });
      cy.get("[role='listbox']")
        .eq(index)
        .find(".v-list-item__title")
        .contains(room.type)
        // .eq(index)
        .click({ force: true });
      cy.get(".bed-quantity").eq(index).type(room.quantity);
      if (rooms.length > index + 1) cy.get(".mdi-plus").click();
    });

    cy.contains("Nº. de adultos").siblings("input").clear().type(adultCapacity);

    cy.contains("Nº. de crianças")
      .siblings("input")
      .clear()
      .type(childrenCapacity);

    if (coworkerDiscount)
      cy.contains("Desconto para co-workers")
        .siblings("input")
        .type(coworkerDiscount);

    if (coworkerExclusive)
      cy.contains("Exclusivo para co-workers")
        .siblings()
        .children("[type='checkbox']")
        .check({ force: true });

    cy.get("[data-test-id='save']").click({ force: true });

    // wait for creation of product and table of lodge rooms
    cy.intercept({
      method: "POST",
      url: postURL,
    }).as("addProduct");

    cy.wait("@addProduct", { timeout: 15000 });

    cy.get("table").contains("span", roomSKU).should("have.text", roomSKU);

    cy.get("table").contains("span", roomName).should("have.text", roomName);

    cy.get("table").contains("span", roomPrice).should("have.text", roomPrice);

    cy.get("table")
      .contains("span", roomQuantity)
      .should("have.text", roomQuantity);

    cy.get("table")
      .contains("span", coworkerDiscount)
      .should("have.text", coworkerDiscount);
  });
});
