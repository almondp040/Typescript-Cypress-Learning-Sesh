# Cypress Day 5 Component Testing

- Starts essentially the same way as E2E testing! 
- May require additional configs but it's not too bad to do! 
- Needs some type of webpack loader, but since we're doing E2E, we don't really need to dive deep into this portion. 


- Just notes: 
    - Extremely similar to E2E tests, uses describe and it code blocks for testing. 

- Component VS E2E
    - Cypress Component Testing uses the same test runner, commands and API to test components instead of pages. 
    - However, the main difference is that Cypress Component Testing builds your components using a dev server instead of rendering within a complete website, which results in faster tests and fewer dependencies on infrastructure than end-to-end testrs covering the same code paths
    - Essentially looks at the individual component and not the entire website

- Additional Configs
    - Cypress usually auto adds our configs for us, but this will likely come from the team or will already be set up
    - We may have to feed our components data for testing as well

- Instead of navigating your application, we would use cy.mount('<COMPONENT/>')
    - Once our cy.mount() is set up, we can then run tests just like we did for E2E. 

    - For example: 
    const items = [
        {data: "WE MIGHT NEED THIS, BUT E2E IS EASIER TO SET UP AND GO!"}
        ]

    describe('COMPONENT TEST', ()=>{
        it('COMPONENT TEST 1', ()=>{
            cy.mount(<COMPONENT items={items}/>)

            //Cypress test functions to test the component
        })
    })


- Best Practices

    - Make sure to test Unhappy Paths
        - Don't just test the 'Happy Path' of the user, make sure to test users that might try and break your app. 

    - Use Stable Selectors
        - Use data attributes to provide context to your selectors and isolate them from CSS or JS changes, don't target elements based on CSS attrubutes such as ID, class or tags. 
        - Dont target elements that may change their textContent and do not use generic selectors. 
        -Basically try to use specific data attributes for our cy.get selectors


    - Do not assign return values
        - Cypress does NOT run synchonously
        - It's better to run a .then() for our tests if we ever need to potentially return something
        - Shouldn't have to run into this, and we should use the Cypress chaining commands, but worse case we can use the docs

    - Do not test external sites
        - Only test sites we can control and try to avoid visiting or requiring a 3rd party server. 
        - If you choose, you may use cy.request to speak to 3rd party servers via their APIs. 
        - Also try to cache results via cy.session() to avoid repeat calls
        - Really try not to do testing for external sites, let the 3rd party test their own stuff. 

    - Keep tests independent
        - Do not make one test dependent on another, and becomes difficult to manage
        - The editPatient stuff for example, each of those tests should individually grab their own patient! 
        - ALL TESTS SHOULD WORK IN ISOLATION!!!

    - Do not worry about writing tiny tests
        - Writing tiny tests, like unit tests, is non-performant and excessive
        - Cypress resets various state and tests between tests that takes a long time
        - Small tests hurt performance, plus you'll still know exactly what assertion fails in a longer e2e test. 

    - Clean up state before test run
        - Cypress already cleans up state between tests, so this might not be something you need to worry about at all
        - Do not clean up state with after() or afterEach()

    - Using arbitary cy.wait()
        - Do not spam cy.wait() everywhere and we should use aliases with cy.wait() instead
        - For example: 

        cy.wait('@whatWeAreWaitingOn')

    
