/// <reference types="Cypress" />
 
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit("./src/index.html")
    })
  
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

//Aula2    
//Exercício 1
  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste'
    cy.get('#firstName').type('Camila')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('camila.monteiro@luizalabs.com')
    cy.get('#open-text-area').type('longText', {delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    })

//Exercício 2
  it('exibe mensagegm de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste,Teste, Teste, Teste'
    cy.get('#firstName').type('Camila')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('camila.monteiro@luizalabs,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    })

//Exercício 3
  it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){
    cy.get('#phone')
        .type('abcdergf')
        .should('have.value','')
    })


})