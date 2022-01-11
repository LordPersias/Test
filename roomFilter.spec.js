/// <reference types="cypress" />

describe("Room filter", () => {
  beforeEach(() => {
    cy.visit("/local/colmeal-countryside-hotel");
  });

  // context("All elements displayed", () => {
  //   it("should display adults selection", () => {
  //     cy.contains("Adultos").should("be.visible");
  //   });

  //   it("should display children selection", () => {
  //     cy.contains("Crianças").should("be.visible");
  //   });

  //   it("should display rooms selection", () => {
  //     cy.contains("Quartos").should("be.visible");
  //   });

  //   it("should display search button", () => {
  //     cy.get("button").should("contain", "Pesquisar");
  //   });
  // });

  context("DateRange interaction", () => {
    it("should select date range", () => {
      cy.get("[placeholder='Data inicial']").click().clear().type("2021-09-01");
      cy.get("[placeholder='Data final']")
        .click()
        .clear()
        .type("2021-09-03{enter}");
      cy.get("[placeholder='Data final']").blur();
      cy.get("button").contains("Pesquisar").click();
    });
  });
});
