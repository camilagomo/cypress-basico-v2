/// <reference types="Cypress" />
 
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit("./src/index.html")
    })
  
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it.only('preenche a area de texto usando o comando invoke', function(){
    const longText = Cypress._.repeat('0123456789', 20)
    //a variável seta e confirma se o que está visível é de fato o "texto longo = variável criada"
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })
  it('Faz uma requisição HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('Ok')
        expect(body).to.include('CAC TAT')
      })
  })

})
