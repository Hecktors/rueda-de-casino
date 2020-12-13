/// <reference types="cypress" />

const testId = (id) => `[data-testid="${id}"]`

describe('rueda-de-casino', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
})
