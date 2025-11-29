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


# Day 3 Cypress Study Sesh

- Where we left off:
    - yt: https://www.youtube.com/watch?v=u8vMu7viCm8&t=16s
    - time: 1:56:37

- Cypress is smart enough to automatically retry for an element until it exists! 

- Explicit Waits
    - There are times where we want to specifically wait for something to happen, and this will wait until something is done! 
    - To use it, its cy.wait('TIME WE WANNA WAIT FOR IN MILLISECONDS');

- Alias
    - To create a alias we can use the .as() function so that we can reference the same HTML element or function repeatedly in our code
    - Kinda like giving our stuff a name, then we can use this in our cy.get()

    - For example: 
        //Alias: 
       cy.grabDataField('subscribe-form').as('subForm'); 
       cy.grabDataField('subscribe-button').as('subButton'); 
        
        cy.get('@subForm').click()
        .type(`${testEmail}{enter}`); 

- Contains
    - Checks the page to see if a HTML element contains a string of text, then we can use .should() to see if it exists or not on the page after a specific step


- Multipage Testing: 
    - You can quite easily write tests across pages to better test entire user workflows. 
    - You can click on navigation buttons or use cy.visit(), and use cy.location("PATHNAME").should("equal", "/some-path") to make sure you are in the correct location. 

    
- Intercepts
    - Cypress provides multiple ways of working with network requests. 
    - One way is by using intercepts! (See Docs for some examples!)
    - Basically route testing! 

    For Example: 
    cy.intercept('TYPE OF REQUEST', 'ROUTE')

        it.only('Post Data Button Intercept', () => {
        cy.visit('examples'); 
        cy.intercept('POST', 'http://localhost:3000/examples', {
            body: {
                message: "Where does this go?"
            }
        })
    });

        Another Example of using cy.request() which is probably easier to understand: 
    
    Ignore Context for now

    context("POST /bankAccounts", function () {
    it("creates a new bank account", function () {
      const { id: userId } = ctx.authenticatedUser!;

      cy.request("POST", `${apiBankAccounts}`, {
        bankName: `${faker.company.companyName()} Bank`,
        accountNumber: faker.finance.account(10),
        routingNumber: faker.finance.account(9),
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.account.id).to.be.a("string");
        expect(response.body.account.userId).to.eq(userId);
      });
    });
  });




    - And we can use aliases with this as well!
    - Useful for API call testing! 
    - We can also use wait() with these route requests!

    
- Fixtures
    - Cypress auto adds mock data for API requests! 
    - use fixture: "fileName.json" so that our JSON Mock Data auto pulls into the request using the fixture
    - How we can use mock data json files with API requests, and is super useful to make sure our API's work. 
    - Can be a POST, GET, PUT PATCH, DELETE


- Helpful Methods for API Testing and Multipage Testing
    - Cypress provides a ton of methods, but some we should keep an eye on are: 
    - cy.its()
        - is a handy method when you want to get the property off (value) of something
        - we can also use this method with API calls to grab the response.body as well

    - cy.invoke()
        - Allows us to run functions on objects on specific data types. 
        - For example we can use invoke('slice', 0, 5) which will run the slice function on a response.body array
        - Allows us to call JS functions on JS data types! 

    - cy.request()
        - Is a helpful method anytime you need to make a HTTP request within your tests and perform expectations against it. 
        - Useful for API testing as well!
        - Works extremely similar to the .fetch() method!

    - cy.within()
        - Allows you to easily get nested elements within a particular group of elements
        - For example input elements within a larger form element
        - This will limit the scope of Cypress commands to within a specific element
        - Useful to drill down into the element



    - See the docs for the other methods