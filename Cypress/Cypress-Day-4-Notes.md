# Cypress Day 4 Notes

- Its and Within Practice and Notes: 

    - Use its() to select the element from a list or from multiple elements, then we can run functions against it. 

    - If we use a cy.get() and this returns an array of items, we can use its(INDEX NUM) to select the specific element we wanna use! 

    - For Example: 

    - Use its() to grab the new li added to the list, then click on it's X button to clear it: 

                 cy.get('[style="color:white;list-style-type:none"]').within(()=>{
                    cy.get('li').should('have.length.greaterThan',1).its(1).within(()=>{
                cy.get('button').click(); 
            })
            
        }); 


    - Within allows us to check elements within a parent element. Using this in combo with its() can be extremely powerful!


- Component Testing (For Tomorrow, not needed for work!)

    - vid: https://www.youtube.com/watch?v=u8vMu7viCm8&t=16s
    - time: 2:12:50
    

