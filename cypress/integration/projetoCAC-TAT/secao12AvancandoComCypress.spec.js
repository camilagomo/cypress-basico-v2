/// <reference types="Cypress" />
 
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function(){
        cy.visit("./src/index.html")
    })
  
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste'
    
    cy.clock()
    
    cy.get('#firstName').type('Camila')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('camila.monteiro@luizalabs.com')
    cy.get('#open-text-area').type('longText', {delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible') //após 3 segundos deve sumir elemento na tela
    })

    it('exibe mensagegm de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste'
        
        cy.clock() //congela relógio do navegador
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('camila.monteiro@luizalabs,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
  
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido corretamente', function(){
        
        cy.clock()
        
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('camila.monteiro@luizalabs.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
  
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })
    
    //Exercício 6
    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.clock()
    
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
    })

})