Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Camila')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('camila.monteiro@luizalabs.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
