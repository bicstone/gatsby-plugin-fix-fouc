describe("charterList", () => {
  it("should display charter list", () => {
    cy.visit("/");

    cy.get("body").contains("Content!").should("be.visible");
  });
});
