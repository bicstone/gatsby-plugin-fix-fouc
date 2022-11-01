/* eslint-disable no-eval */

describe("onRenderBody", () => {
  beforeEach(() => {
    // To disable gatsby and loading-screen-fail-safe
    cy.clock();

    cy.viewport(599, 350);
    cy.visit("/");
  });

  describe("setHeadComponents", () => {
    describe(`loading-screen-style`, () => {
      it("should set the visible style when viewpoint width is less than minWidth", () => {
        // minWidth is set to 600px
        cy.viewport(599, 350);
        cy.get("body").should("exist").and("have.css", "opacity", "1");
      });
      it("should set the invisible style when viewpoint width is equal to minWidth", () => {
        // minWidth is set to 600px
        cy.viewport(600, 350);
        cy.get("body").should("exist").should("have.css", "opacity", "0");
      });
      it("should set the invisible style when viewpoint width is greater than minWidth", () => {
        // minWidth is set to 600px
        cy.viewport(601, 350);
        cy.get("body").should("exist").should("have.css", "opacity", "0");
      });
    });

    describe(`loading-screen-noscript-style`, () => {
      it("should set the visible style when javascript is disabled", () => {
        // minWidth is set to 600px
        cy.viewport(601, 350);
        cy.document().then((doc) => {
          // Remove noscript tag and append to head.
          const nsHtml = doc.head.getElementsByTagName("noscript")[0].innerHTML;
          const nsStyle = /^<style>(.+)<\/style>$/.exec(nsHtml)?.[1];

          const style = document.createElement("style");
          style.innerHTML = nsStyle ?? "";

          doc.head.appendChild(style);
        });
        cy.get("body").should("exist").and("have.css", "opacity", "1");
      });
    });
  });
});
