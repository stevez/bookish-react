/// <reference types="cypress" />

describe('Bookish application', () => {
  beforeEach(() => {
    gotoApp();
  });

  it('Visits the bookish', () => {
    checkAppTitle();
  });

  it('SHows a book list', () => {
    checkBookListWith(
      ['Refactoring', 'Domain-driven design', 'Building Microservices', 'Acceptance Test Driven Development with React']
    )
  });

  it('Goes to the detail page', () => {
    cy.get('div.book-item').contains('View Details').eq(0).click()
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains("Refactoring");
  });

  it('Searches for a title', () => {
    checkBookListWith(
      ['Refactoring', 'Domain-driven design', 'Building Microservices', 'Acceptance Test Driven Development with React']
    )
    cy.get('[data-test="search"] input').type('design');
    cy.get('div.book-item').should('have.length', 1);
    cy.get('div.book-item').eq(0).contains('Domain-driven design');
  });
});

const gotoApp = () => {
  cy.visit('http://localhost:3000/');
}
const checkAppTitle = () => {
  cy.get('h2[data-test="heading"]').contains('Bookish')
}

const checkBookListWith = (expectation = []) => {
  cy.get('div[data-test="book-list"]').should('exist')
  cy.get('div.book-item').should((books) => {
    expect(books).to.have.length(expectation.length)
    const titles = [...books].map(x => x.querySelector('h2').innerHTML)
    expect(titles).to.deep.equal(expectation)
  })
}

