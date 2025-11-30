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

//Use Cypress.Commands.add('NAME OF OUR CUSTOM COMMAND', CALLBACK FUNCTION)
Cypress.Commands.add('getDataTest', (dataTestSelector)=>{
   //Make sure to return the function for use in other files: 
    return cy.get(`[data-test="accordion-item-${dataTestSelector}"] div[role="button"]`); 
}); 

//Data Test Command: 
Cypress.Commands.add('grabDataField', (className)=>{
    return cy.get(`[data-test="${className}"]`); 
})

//Grab elements by class: 
Cypress.Commands.add('getHeader', (headerSelector)=>{
    return cy.get(`[class="${headerSelector}"]`)
})


