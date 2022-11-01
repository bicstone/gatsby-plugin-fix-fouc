describe("onRenderBody", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("/");
  });

  describe("setHeadComponents", () => {
    describe(`loading-screen-style`, () => {
      it("should set the not visible style", () => {
        cy.viewport(640, 350);
        cy.get("body").should("exist");
        cy.get("body").should("not.contain", "Content");
      });
    });
  });
});
