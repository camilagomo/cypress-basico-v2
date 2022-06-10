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

  //Exercício 4 - Validação de campos obrigatórios
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido corretamente', function(){
      cy.get('#firstName').type('Camila')
      cy.get('#lastName').type('Monteiro')
      cy.get('#email').type('camila.monteiro@luizalabs.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
  })

  //Exercício 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName')
          .type('Camila')
          .should('have.value', 'Camila')
          .clear()
          .should('have.value', '')
      cy.get('#lastName')
          .type('Monteiro')
          .should('have.value', 'Monteiro')
          .clear()
          .should('have.value', '')
      cy.get('#email')
          .type('camila.monteiro@luizalabs.com')
          .should('have.value', 'camila.monteiro@luizalabs.com')
          .clear()
          .should('have.value', '')
      cy.get('#phone')
          .type('12345239')
          .should('have.value', '12345239')
          .clear()
          .should('have.value', '')
  })

  //Exercício 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
  })

  //Exercício 7 - Criado comandos customizados na commands.js para envio de form
  it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
  })

  //Exercício 8 - Comando cy.contains para identificar elementos
  //Nesse caso alteramos de cy.get para cy.contains, quando houver seletor com conteúdo específico.

//Aula 3

  //Exercício 1  - Seleciona um produto no combo
  it('seleciona um produto (YouTube) por seu texto',function(){
      cy.get('#product')
          .select('youtube')
          .should('have.value', 'youtube')
  })

  //Exercício extra 1  - Seleciona um produto pelo seu valor
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
  })

  //Exercício extra 2  - seleciona um produto (Blog) por seu índice
  it('seleciona um produto (Blog) por seu índice)', function(){
      cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
  })

//Aula 4
//São Elementos de seleção única

  it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
  })

  //Valida se cada radio button está marcado, e cada um é verificado
  it('marca cada tipo de atendimento"', function(){
      cy.get('input[type="radio"]')
          .should('have.length',3) //verifica o tamanho do input
          .each(function($radio){
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
      })

  })

  //Aula 5
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })      

    //Alterando semântica do exercício da aula 4 - Altera de click para .check no telefone
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido corretamente', function(){
        cy.get('#firstName').type('Camila')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('camila.monteiro@luizalabs.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
   
        cy.get('.error').should('be.visible')
    })    

    //Aula 6
    //Seleciona e verifica seleção do arquivo com nome correto
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'}) //simulando arrastar o arquivo
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')  
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })    
         
    })

    //Aula 7
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})


 

