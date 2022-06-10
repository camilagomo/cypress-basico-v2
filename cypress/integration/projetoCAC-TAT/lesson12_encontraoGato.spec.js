/// <reference types="Cypress" />
 
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit("./src/index.html")
    })
  
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

it('encontra o gato escondido',function(){
    cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    cy.get('#title')
        .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
        .invoke('text', 'Eu amo gatos!')
    })

})