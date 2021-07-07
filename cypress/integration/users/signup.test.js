describe("User signup", () => {
  beforeEach(() => {
    // before each test, navigate to home page
    cy.visit("/")
  })

  it("Creates a new user", () => {
    // navigate to sign up page
    cy.visit("/sign-up")
    // fill out the fields with valid info
    cy.get('[data-cy=signup-username]').type("Guy Cool" + Date.now())
    cy.get('[data-cy=signup-email]').type(`guycool${Date.now()}@gmail.com`)
    cy.get('[data-cy=signup-password]').type("Banana1!")
    cy.get('[data-cy=signup-passwordConfirmation]').type("Banana1!")
    // click the sign up button
    cy.get('[data-cy=signup-button]').click()

    // expect redirect to home
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it("Requires a username", () => {
    // navigate to sign up page
    cy.visit("/sign-up")
    // fill out the fields with valid info
    cy.get('[data-cy=signup-email]').type(`guycool${Date.now()}@gmail.com`)
    cy.get('[data-cy=signup-password]').type("Banana1!")
    cy.get('[data-cy=signup-passwordConfirmation]').type("Banana1!")

    // button should be disabled sue to lack of username
    cy.get('[data-cy=signup-button]').should("be.disabled")
  })

  it("Requires a valid email", () => {
    // navigate to sign up page
    cy.visit("/sign-up")
    // fill out the fields with valid info
    cy.get('[data-cy=signup-username]').type("Guy Cool" + Date.now())
    cy.get('[data-cy=signup-email]').type(`guycool${Date.now()}@gmail`)
    cy.get('[data-cy=signup-password]').type("Banana1!")
    cy.get('[data-cy=signup-passwordConfirmation]').type("Banana1!")

    // button should be disabled sue to lack of username
    cy.get('[data-cy=signup-button]').should("be.disabled")
  })

  it("Requires a valid email", () => {
    // navigate to sign up page
    cy.visit("/sign-up")
    // fill out the fields with valid info
    cy.get('[data-cy=signup-username]').type("Guy Cool" + Date.now())
    cy.get('[data-cy=signup-email]').type(`guycool${Date.now()}@gmail`)
    cy.get('[data-cy=signup-password]').type("Banana1!")
    cy.get('[data-cy=signup-passwordConfirmation]').type("Banana1!")

    // button should be disabled sue to lack of username
    cy.get('[data-cy=signup-button]').should("be.disabled")
  })
})
