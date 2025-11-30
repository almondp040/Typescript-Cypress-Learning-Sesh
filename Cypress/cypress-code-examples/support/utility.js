//Write a utility function that takes in our href route string for the cy example file: 
const routeChecker = (routeName)=>{
        cy.visit(''); 
        cy.get(`[href="${routeName}"]`).click(); 
        cy.wait(2000); 
        cy.location('pathname').should('equal', `${routeName}`)
        cy.wait(2000); 
}

export default routeChecker; 