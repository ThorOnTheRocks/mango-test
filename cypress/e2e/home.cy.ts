describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display the Mango logo', () => {
    cy.get('img[alt="mango logo"]').should('be.visible');
  });

  it('Should have links to Exercise 1 and Exercise 2', () => {
    cy.get('a[href="/exercise1"]')
      .should('be.visible')
      .and('contain', 'Exercise 1');
    cy.get('a[href="/exercise2"]')
      .should('be.visible')
      .and('contain', 'Exercise 2');
  });

  it('Should navigate to Exercise 1 when the link is clicked', () => {
    cy.get('a[href="/exercise1"]').click();
    cy.url().should('include', '/exercise1');
  });

  it('Should navigate to Exercise 2 when the link is clicked', () => {
    cy.get('a[href="/exercise2"]').click();
    cy.url().should('include', '/exercise2');
  });
});
