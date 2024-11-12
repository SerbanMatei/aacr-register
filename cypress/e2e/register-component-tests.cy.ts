
describe('Register Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#/register');
  });

  it('should display the registration form', () => {
    cy.get('form').should('exist');
    cy.get('input#username-input').should('exist');
    cy.get('input#password-input').should('exist');
    cy.get('input#email-input').should('exist');
    cy.get('input#fullname-input').should('exist');
  });

  it('should show alphanumeric error if username contains special characters', () => {
    cy.get('input#username-input').type('abc!@');
    cy.get('body').click(0,0);
    cy.get('#username-error-message')
      .should('contain', 'Username accepts only alphanumeric characters')
      .and('be.visible');
  });

  it('should show strong password error if password don\'t match the requirements', () => {
    cy.get('input#password-input').type('password', { force: true });
    cy.get('body').click(0,0);
    cy.get('#password-error-message')
      .should('contain', 'Password should contain at least 1 lowercase, 1 uppercase, 1 digit and 1 special character')
      .and('be.visible');
  });

  it('should submit the form with valid data', () => {
    cy.get('input#username-input').type('username');
    cy.get('input#password-input').type('Password!1', { force: true });
    cy.get('input#email-input').type('user@example.com');
    cy.get('input#fullname-input').type('User Fullname');

    cy.intercept('POST', '/register', { statusCode: 200 }).as('registerUser');
    cy.get('button.register-btn').click();

    cy.wait('@registerUser').its('response.statusCode').should('eq', 200);
  });

  it('should enable the register button when the form is valid', () => {
    cy.get('input#username-input').type('username');
    cy.get('input#password-input').type('Password!1', { force: true });
    cy.get('input#email-input').type('user@example.com');
    cy.get('button.register-btn').should('not.be.disabled');
  });
});
