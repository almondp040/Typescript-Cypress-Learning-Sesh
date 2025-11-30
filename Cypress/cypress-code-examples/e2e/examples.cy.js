import { default as routeChecker } from "../support/utility";

describe('Navbar Route Testing', ()=>{
    //Multipage Testing Why Cypress?
    it('Multipage Testing Why Cypress', () => {
        routeChecker("/"); 
    });

    //Multipage Testing Examples: 
    it('Multipage Testing Examples', () => {
        routeChecker("/examples"); 
    });
    // /overview
    it('Multipage Testing Overview', () => {
        routeChecker("/overview"); 
    });

    // /fundamentals
    it('Multipage Testing Fundamentals', () => {
        routeChecker("/fundamentals"); 
    });
    // /forms
    it('Multipage Testing Forms', () => {
        routeChecker("/forms"); 
    });
    // /component
    it('Multipage Testing Components', () => {
        routeChecker("/component"); 
    });
    // /best-practices
    it('Multipage Testing Best-practices', () => {
        routeChecker("/best-practices"); 
    });


    //Intercept the Post Data Button: 
    it('Post Data Button Intercept', () => {
        cy.visit('examples'); 
        cy.intercept('POST', 'http://localhost:3000/examples', {
            fixture: "example.json" //Mock Data for Post Request
        })
        cy.grabDataField('postButton').click()
    });


    it.only('Add Multiple Grudge Test', ()=>{
        cy.visit('examples');
        cy.get('h3').should('have.text', 'Add Some Grudges'); 
        cy.get('input').should('have.id', ':Ra6qqcq:').as('grudgeInput');
        cy.get('button').contains('Add Grudge').as('addGrudge'); 
        let grudgeInput1 = 'Please Add This Grudge';  
        let grudgeInput2 = 'Please Add This Grudge Again!';  
        
        
        //Enter text into our grudge input: 
        cy.get('@grudgeInput').type(`${grudgeInput1}{enter}`); 
        
        cy.get('button').contains('Clear').should('not.exist'); 
        //Use within() to check the list of li's to make sure they are not there, when there are no grudges
        cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').should('have.length',0)
        }); 
        //<ul style="color:white;list-style-type:none"><li><span>Please Add This Grudge</span><button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button">X<span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button></li></ul>
        //Make sure our span is not visible/does not exist: 
       // cy.get('span').contains(`${grudgeInput}`).should('not.exist'); 
        //Adds our Grudge
        cy.get('@addGrudge').click(); 

        //After we add our grudge, the title changes to Grudges: 
        cy.get('h3').should('have.text', 'Grudges') 

        //Now we should have a span on the page that contains our grudge: 
        cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').should('have.length.greaterThan',0)
        }); 
       

        //Type our Second Grudge: 
        cy.get('@grudgeInput').type(`${grudgeInput2}{enter}`);

        //Checks the list of li's to make sure our 1st grudge is still there: 
        cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').contains(`${grudgeInput1}`).should('have.length',1)
        }); 

        //Add our 2nd Grudge: 
         cy.get('@addGrudge').click();

         //Check to make sure our 1st grudge is still there, and the new one contains the text from grudgeInput2: 
         cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').should('have.length.greaterThan',1).contains(`${grudgeInput2}`).as('liTest'); 
            
        }); 

        //Clear our a item on the list by selecting the X button: 
        cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').should('have.length.greaterThan',1).its(1).within(()=>{
                cy.get('button').click(); 
            })
            
        }); 


        //Now make sure the list only contains the 1st input: 
        cy.get('[style="color:white;list-style-type:none"]').within(()=>{
            cy.get('li').should('have.length.greaterThan',0).contains(`${grudgeInput1}`)
        }); 
    
        //Button should exist in order to clear the grudges: 
         cy.get('button').contains('Clear').should('exist');

        //Finally hit the clear button to remove all grudges: 
        cy.get('button').contains('Clear').click(); 
    }); 
});