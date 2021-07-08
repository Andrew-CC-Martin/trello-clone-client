describe("user signup", () => {
  beforeEach(() => {
    // navigate to the sign up page
    cy.visit("/sign-up")
  })

  it("creates a new user", () => {
    // fill out the fields
    cy.get("[data-cy=signup-username]").type("Guy Cool" + Date.now())
    cy.get("[data-cy=signup-email]").type(`guycool${Date.now()}@gmail.com`)
    cy.get("[data-cy=signup-password]").type("Banana!1")
    cy.get("[data-cy=signup-passwordConfirmation]").type("Banana!1")

    // click the sign up button
    cy.get("[data-cy=signup-button]").click()

    // expect a redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + "/")
  })

  it("requires a username", () => {
    // fill out the fields, except for username
    cy.get("[data-cy=signup-email]").type(`guycool${Date.now()}@gmail.com`)
    cy.get("[data-cy=signup-password]").type("Banana!1")
    cy.get("[data-cy=signup-passwordConfirmation]").type("Banana!1")

    // confirm that button is disabled
    cy.get("[data-cy=signup-button]").should("be.disabled")
  })
})
