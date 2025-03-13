describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.contains("How can I help?");
  });
});
