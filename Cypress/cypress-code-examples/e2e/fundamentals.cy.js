//Describes what we are actually looking to test: 
describe('Fundamentals Test', () => {

  //Before Each will run before the test cases run down below! 
  //Using Before Each to navigate to the fundamentals page: 
  beforeEach(() => {
    cy.visit('fundamentals'); 
  });
  
  
  //Here's our actual tests! 
  it('Contains correct header text', () => {
    
    //Make an assertion on the H1 element that it should contain Testing Fundamentals: 
    //cy.get('h1').should('have.class', 'fundamentals_header__yRsdA').contains("Testing Fundamentals");

    //Cypress should have selectors that are really specific to the test,
    //passing in our class via the array allows us to select our item specifically
    //'h1.fundamentals_header__yRs, <h1 class="fundamentals_header__yRsdA">Testing Fundamentals</h1>
    //cy.get('[class="fundamentals_header__yRsdA"]').contains("Testing Fundamentals")
    cy.getHeader("fundamentals_header__yRsdA").contains("Testing Fundamentals"); 


  })

  //How we use the website is how we should write test cases! 
  it('Accordion works correctly for #1', () => {
    //Before click our text should not show: 
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible'); 
    cy.getDataTest(1).click()//Click on the accordian
    //After click this should now show
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible');
    cy.getDataTest(1).click(); 
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible');

  });


  //Fundamental #2: Using it.only() we can just run 1 test: 
    it('Accordion works correctly for #2', () => {
    //Navigate to the fundamentals page: 
    
    let text = "Within your describe block, you will also have it blocks. It blocks will be single tests within an overall test file. The API for it() is the same as describe. The first argument is the title of an individual test, and the second argument is a callback function containing your test code";
    //Before click our text should not show: 
    cy.contains(text).should('not.be.visible'); 
    cy.getDataTest(2).click()//Click on the accordian
    //After click this should now show
    cy.contains(text).should('be.visible');
    cy.getDataTest(2).click(); 
    cy.contains(text).should('not.be.visible');

  });

})