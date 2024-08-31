describe('PokeAPI Tests', () => {

    it('should retrieve data for Pikachu', () => {
        // Send GET request to PokeAPI for Pikachu
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu')
            .then((response) => {
                // Assert the response status is 200
                expect(response.status).to.eq(200);

                // Assert that the response is for Pikachu
                expect(response.body.name).to.eq('pikachu');

                // Assert that Pikachu has the ability 'lightning-rod'
                const abilities = response.body.abilities.map(a => a.ability.name);
                expect(abilities).to.include('lightning-rod');
            });
    });

    it('should mock and return 404 for Charmander using intercept', () => {
        // Intercept the GET request and mock a 404 response
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/charmander', {
            statusCode: 404,
            body: { error: 'Not found' } // Optional: Custom error message
        }).as('getCharmander');

        // Visit the HTML fixture that makes the API request
        cy.visit('cypress/fixtures/index.html');

        // Wait for the intercepted call and verify the status
        cy.wait('@getCharmander').its('response.statusCode').should('eq', 404);
    });

});