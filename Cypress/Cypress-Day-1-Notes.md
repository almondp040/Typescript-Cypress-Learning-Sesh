# Cypress Intro

- Cover's the fundamentals, but we should still look to read the docs for the details! 

- Video: https://www.youtube.com/watch?v=u8vMu7viCm8&t=16s
- Where we left off: 49:59

- Why Cypress
    - All in one testing framework, assertion library, with mocking and stubbing
    - Focus on E2E and component testing -- real world testing
    - Runs in the browser and wrote in JS (Yay!)
    - Good performance and can be integrated in CI/CD quite easily
    - Native Access to the DOM and to your app, debug just like a regular app. 
    - 

- To open Cypress run npx cypress open
    - On open it will automatically add some files to your project
    -Use create spec to set up our testing, Cypress handles configs automatically for us, with some example code 


- Cypress Fundamentals: 
    - Each describe function should be in it's own individual file. 
    - Describe Functions

         - All of your tests will exist in a describe block. This block takes 2 arguments, the first is what you are testing, the second is the callback function that actually runs the test 

        - For Example: 

        - describe('THIS IS MY TEST', ()=>{
                //Here lies my test code!
             })

    - It Functions

        - Within your describe functions, you will also have It functions, that represent single individual tests within an overall test file.
        - The API for it() is the same as describe, where the first argument is the title of an indiviual test, and the second argument is a callback function containing your test code. 

        - For Example: 

        //Represents the whole test
        - describe('THIS IS OUR TEST!', ()=>{

                it('Test 1', ()=>{
                    //Here lies the first test! 
                })


                
                it('Test 2', ()=>{
                    //Here lies the second test! 
                })

                it('Test 3', ()=>{
                    //Here lies the 3rd test! 
                })


        })



    - Commands and Interacting with Elements: 
        
        - Cypress gives you various commands to help us test, and we can use these commands on the cy object. 
        - For example 
            - cy.visit will navigate the cypress runner to your home page or any page
            - cy.click will click on stuff
            - check the docs for the full list of commands, but this is essentially what we can do with the API! 

    - Cypress commands DO NOT RETURN THEIR SUBJECTS, MEANING YOU CANNOT ASSIGN VARIABLES TO CYPRESS COMMANDS\

    - .then()

        - For example: 

                //This will not work: 
                const button = cy.get("button"); 
                button.click()

        - DO not use variables in your test! 

        - Instead we can use .then(), similar to promise chaining, then we can apply test functionality to the HTML element we are looking to get! 

        AKA cy.get("button").then((button)=>{
            //Click Button: 
            const click = button.click()
        })

        - .wrap() USEFUL IF WE NEED DIRECT ACCESS TO A DOM ELEMENT

            - Because cypress uses jQuery we might need to use .wrap at times for Cypress to interact with it
        

    - Getting Elements

        - It's common practice that you will want to get an element from the DOM and make some sort of assertion, such as my H1 element contains certain test. 
        - You can do this in Cypress by using the .get() and passing in a CSS query selector

        For Example: 
        cy.get("CSS STRING QUERY SELECTOR TO GRAB OUR ELEMENT!")

        - After you get an element you can chain onto that element, and we can use the Docs / ChatGBT for assertion questions, check docs first! 

        For Example: 

        //Grab list items with the class of selected, and we should find 3: 
        //.should() comes from cypress assertions
        cy.get('li.selected').should('have.length', 3)

        - Lots of chaining as well, but no matter what it will always start with cy.get('HTML/CSS SELECTOR').should('HOW IT SHOULD LOOK').and('EVEN MORE CHAINING IF WE NEED IT!')

        - For Example: 

        //Describes what we are actually looking to test: 
        //Also our .contains() can use regex as well :)
    
        //Using Should with assertions is probably easier! 


describe('Fundamentals Test', () => {

  //Here's our actual tests! 
  it('Overview Page Loads', () => {
    cy.visit('http://localhost:3000/fundamentals')

    //Make an assertion on the H1 element that it should contain Testing Fundamentals: 
    //cy.get('h1').should('have.class', 'fundamentals_header__yRsdA').contains("Testing Fundamentals");

    //Cypress should have selectors that are really specific to the test,
    //passing in our class via the array allows us to select our item specifically
    cy.get('[class="fundamentals_header__yRsdA"]').contains("Testing Fundamentals")
  })




})





