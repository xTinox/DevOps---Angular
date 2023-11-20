describe('Sudoku Page', () => {
  const username = 'Joueur1'

  beforeEach(()=>{
    cy.visit('/')
    cy.get('input[id=idPlayer]').type(username)
    cy.get('input[type=checkbox]').click()
    cy.get('button[class="mat-focus-indicator mat-button mat-button-base"]').click()
    
  })
  it('Loaded game', () => {
    cy.url().should('include', '/game')
  })

  it('Correct player name', () => {
    cy.get('mat-card-content[id=idPlayerInGame]').should('contain',username)
  })

  it('Return to menu', () => {
    cy.get('button[id=returnToMenu]').click()
    cy.url().should('include', '/menu')
  })

  it('Check hints in game', () => {
    cy.wait(5000)
    cy.get('div[class=help-tile]').should('exist')
  })
  
})
