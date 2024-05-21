describe('NormalRangePage', () => {
  beforeEach(() => {
    cy.visit('/exercise1');
    cy.wait(500);
  });

  it('Should load the page and displays the range inputs with initial values', () => {
    cy.get('[data-cy="min-input"]').should('have.value', '1');
    cy.get('[data-cy="max-input"]').should('have.value', '100');
  });

  it('Should update min input correctly', () => {
    cy.get('[data-cy="min-input"]').clear().type('20');
    cy.get('[data-cy="min-input"]').should('have.value', '20');
  });

  it('Should update max input correctly', () => {
    cy.get('[data-cy="max-input"]').clear().type('80');
    cy.get('[data-cy="max-input"]').should('have.value', '80');
  });

  it('Should handle slider drag for min bullet', () => {
    cy.get('[data-cy="min-bullet"]').trigger('mousedown');
    cy.get('[data-cy="range-line"]').trigger('mousemove', {
      clientX: 50,
    });
    cy.get('[data-cy="range-line"]')
      .click({ force: true })
      .trigger('mouseup');
    cy.get('[data-cy="min-input"]').should('not.have.value', '1');
  });

  it('Should handle slider drag for max bullet', () => {
    cy.get('[data-cy="max-bullet"]').trigger('mousedown');
    cy.get('[data-cy="range-line"]').trigger('mousemove', {
      clientX: 150,
    });
    cy.get('[data-cy="range-line"]')
      .click({ force: true })
      .trigger('mouseup');
    cy.get('[data-cy="max-input"]').should('not.have.value', '100');
  });
});
