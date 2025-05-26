// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Команда для эмуляции drag-and-drop
Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
  cy.get(dragSelector).trigger('dragstart');
  cy.get(dropSelector).trigger('drop');
});

// Команда для авторизации пользователя
Cypress.Commands.add('login', () => {
  cy.setCookie('accessToken', 'test-access-token');
  cy.setCookie('refreshToken', 'test-refresh-token');
  
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
}); 