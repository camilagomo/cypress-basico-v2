//Executa 3 vezes o mesmo bloco de código para garantir a resiliência do código
Cypress._.times(3, function(){
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })        
})