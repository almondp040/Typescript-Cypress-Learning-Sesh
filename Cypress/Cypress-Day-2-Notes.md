# Day 2 Cypress Study Sesh! 
- link: https://www.youtube.com/watch?v=u8vMu7viCm8&t=16s
- time: 1:11:46
- beforeEach()
    - Allows us to run a function before each individual test! 
    - We can also run before()

- Custom Commands
    - You aren't limited to just the cypress built in commands, but you can create your own custom commands. 
    - You add your custom commands to cypress/support/commands.ts
    - For example you might add a custom command called getData that gets an element by data-test

    //Use Cypress.Commands.add('NAME OF OUR CUSTOM COMMAND', CALLBACK FUNCTION FOR CUSTOM COMMAND)
        Cypress.Commands.add('getDataTest', (dataTestSelector)=>{
        return cy.get(`[data-test="accordion-item-${dataTestSelector}"] div[role="button"]`); 
        })


- REMEMBER: CY.GET USES CSS SELECTORS VIA A STRING TO SELECT THE ELEMENT!!! 

- Testing Forms
    - First select the input field we want to use by cy.get()
    - Then we can use .type("ENTER TEXT {ACTION}") to type in our text
    - Finally we can select the button and use .click() to add in our text!

    - see forms.cy.js for an example, but we haven't figured out how to test the paragraph text just yet! 