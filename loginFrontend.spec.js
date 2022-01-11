/// <reference types='cypress'/>

describe("login frontend", () => {
  beforeEach(() => {
    cy.visit("https://localhost:3000/local/belmonte-sinai-hotel");
  });

  // Cypress doesn't recommend accessing 3rd party sites ("Only test what you control. Try to avoid requiring a 3rd party server.")
  // it("should login with Google", () => {
  //   const email = "lfcars@gmail.com";

  //   cy.get("[data-test-id='login-btn']").click();
  //   cy.get(".ahp-google-btn").click();
  //   cy.contains("Inicie").click();
  //   //...
  // });
  // it("should login with Facebook", () => {
  //   const email = "lfcars@gmail.com";
  //   //...
  // });

  it("should show error with no email and no password", () => {
    cy.get("[data-test-id='login-btn']").click();

    cy.get(".login-btn").click();

    cy.contains("Por favor introduza o seu email.").should(
      "have.text",
      "Por favor introduza o seu email."
    );

    cy.contains("Por favor introduza a sua password.").should(
      "have.text",
      "Por favor introduza a sua password."
    );
  });

  it("should register user with email and no password", () => {
    const email = "abc@abc.com";
    const password = "!123#456";

    cy.get("[data-test-id='login-btn']").click();

    cy.get(".new-user").click();

    cy.get("#register_email").type(email);
    cy.get("[type='password']").type(password);

    cy.get(".login-btn").click();

    cy.contains("Utilizador criado com sucesso.").should(
      "have.text",
      "Utilizador criado com sucesso."
    );

    cy.get(".ok-btn").click();

    cy.get("[data-test-id='login-btn']").should("not.exist");
  });

  it("should show error when registering existing user", () => {
    const email = "abc@abc.com";
    const password = "!123#456";

    cy.get("[data-test-id='login-btn']").click();

    // FALTA IMPLEMENTAR

    // cy.get(".new-user").click();

    // cy.get("#register_email").type(email);
    // cy.get("[type='password']").type(password);

    // cy.get(".login-btn").click();

    // cy.contains("Utilizador criado com sucesso.").should(
    //   "have.text",
    //   "Utilizador criado com sucesso."
    // );

    // cy.get(".ok-btn").click();

    // cy.get("[data-test-id='login-btn']").should("not.exist");
  });

  it("should login with email and password", () => {
    const email = "abc@abc.com";
    const password = "!123#456";

    cy.get("[data-test-id='login-btn']").click();

    cy.get("#login_email").type(email);
    cy.get("[type='password']").type(password);

    cy.get(".login-btn").click();

    cy.contains("Login bem sucedido").should(
      "have.text",
      "Login bem sucedido."
    );

    cy.get(".ahp-notification").should(
      "not.have.text",
      "Utilizador inexistente ou password errada."
    );

    cy.get(".ok-btn").click();

    cy.get("[data-test-id='login-btn']").should("not.exist");
  });
});
