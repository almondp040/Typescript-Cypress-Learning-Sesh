//Cypress Form examples: 
describe('Forms Testing', ()=>{

    //Navigate to the Forms page before each test case: 
    beforeEach(()=>{
        cy.visit('forms'); 
    })

    //Test Cases after navigating to the Forms page: 
    it('Test Subscribe Form Header', () => {
        //Make sure the page header has Testing Forms: <h1 class="forms_header__jwCVX">Testing Forms</h1>
        cy.getHeader('forms_header__jwCVX').contains("Testing Forms"); 
    });

    //Test our Subcribe text field: 
    it('Successful Test Subscribe Input', () => {

        let testEmail = "almondpaschal@gmail.com"
       // cy.get(`[data-test="subscribe-form"]`)

       //Alias: 
       cy.grabDataField('subscribe-form').as('subForm'); 
       cy.grabDataField('subscribe-button').as('subButton'); 
        
        cy.get('@subForm').click()
        .type(`${testEmail}{enter}`); 

        cy.contains(`Successfully subbed: ${testEmail}!`).should('not.exist'); 
        //Click Subscribe Button: <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button">Subscribe<span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
       
        cy.get('@subButton').click();   
        cy.contains(`Successfully subbed: ${testEmail}!`).should('exist'); 
        cy.wait(3000); 
        cy.contains(`Successfully subbed: ${testEmail}!`).should('not.exist');

        // //<p>Successfully subbed: ndpaschal@gmail.com!</p>
        // //Failing because its looking at all p's on the page
        // cy.get('[data-test="subscribe-paragraph]').contains(`Successfully subbed: ${testEmail}!`)
    });

    //Unsuccessful Email Input: 
    it('Unsuccessful Test Subscribe Input', () => {

       //Variables & Aliasis: 
           cy.grabDataField('subscribe-form').as('subForm'); 
           cy.grabDataField('subscribe-button').as('subButton'); 
           let testEmail = "almondpaschal";

        cy.get('@subForm').click().type(`${testEmail}{enter}`); 

        cy.contains(`Invalid email: ${testEmail}!`).should('not.exist');
        //Click Subscribe Button: <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button">Subscribe<span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
        cy.get('@subButton').click()
        cy.contains(`Invalid email: ${testEmail}!`).should('exist');
        //Wait for 3 seconds, then the message should not exist anymore: 
        cy.wait(3000); 
        cy.contains(`Invalid email: ${testEmail}!`).should('not.exist');
        

        
        // //Failing because its looking at all p's on the page
        // cy.get('[data-test="subscribe-paragraph]').contains(`Successfully subbed: ${testEmail}!`)
    });


//Unsuccessful Email Input when nothing is entered: 
it('Unsuccessful Test Subscribe Input with Nothing Entered!', () => {
    cy.grabDataField('subscribe-form').as('subForm'); 
    cy.grabDataField('subscribe-button').as('subButton'); 
    let testEmail = "";
    cy.get('@subForm').click().type(`${testEmail}{enter}`); 
    cy.contains(`fail!`).should('not.exist');
    cy.get('@subButton').click()
    cy.contains(`fail!`).should('exist'); 
});

}); 