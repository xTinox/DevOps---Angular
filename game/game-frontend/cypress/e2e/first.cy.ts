import { forEach } from "cypress/types/lodash"

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

  // it('Check hints in game', () => {
  //   cy.wait(1000)
  //   cy.get('div[class=help-tile]').should('exist')
  // })

  it('Show classement', () => {
    cy.get('button[class="mat-focus-indicator mat-fab mat-button-base mat-grey"]').click()
    cy.get('mat-dialog-container').should('exist')
  })

  it('Don\'t show classement', () => {
    //cy.get('button[class="mat-focus-indicator mat-fab mat-button-base mat-grey"]').click()
    cy.get('mat-dialog-container').should('not.exist')
  })

  it('Fill a cell', () => {
    cy.get('div[class="board"]').find('select[class="tile-select-html"]').eq(2).select(5)
    // cy.get('div[class="board"] > ng-reflect-ng-class="case":eq(0)').click()
  })
  it('Fill the sudoku and finish it', () => {

    function selectOption(i, value) {
      cy.get('div[class="board"]')
        .find('select[class="tile-select-html"]')
        .eq(i)
        .select(value);
    }

    selectOption(2,5);
    
    const cellToFill = [8,6,1,9,6,4,1,2,5,1,6,2,8,9,4,3,1,3,9,6,3,4,3,8,9,4,6]
    
    for (let i = 0; i < cellToFill.length; i++) {
      selectOption(i+1,cellToFill[i]);
    }

  });
})
