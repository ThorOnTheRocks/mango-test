describe('FixedRangePage', () => {
  beforeEach(() => {
    cy.visit('/exercise2');
    cy.wait(500);
  });

  it('Should load the page and displays the range labels with initial values', () => {
    cy.get('[data-cy="min-label"]').should('have.text', '1.99');
    cy.get('[data-cy="max-label"]').should('have.text', '70.99');
  });

  it('Should handle slider drag for min bullet', () => {
    cy.get('[data-cy="min-bullet"]').trigger('mousedown');
    cy.get('[data-cy="range-line"]').trigger('mousemove', {
      clientX: 50,
    });
    cy.get('[data-cy="range-line"]')
      .click({ force: true })
      .trigger('mouseup');
    cy.get('[data-cy="min-label"]').should('not.have.text', '1.99');
  });

  it('Should handle slider drag for max bullet', () => {
    cy.get('[data-cy="max-bullet"]').trigger('mousedown');
    cy.get('[data-cy="range-line"]').trigger('mousemove', {
      clientX: 150,
    });
    cy.get('[data-cy="range-line"]')
      .click({ force: true })
      .trigger('mouseup');
    cy.get('[data-cy="max-label"]').should('not.have.text', '70.99');
  });
});
