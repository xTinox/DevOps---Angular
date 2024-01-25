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

  it('Click on cell clickable', () => {
    cy.get('div[class="board"]').find('select[class="tile-select-html"]').eq(3).select(1)
    // cy.get('div[class="board"] > ng-reflect-ng-class="case":eq(0)').click()
  })
  it('Click on cell clickable', () => {
    cy.get('div[class="board"]').find('select[class="tile-select-html"]').should('exist').then(($div) => {
      const contenuDiv = $div.text();
      console.log(contenuDiv);
    
      // const estEntre1et9 = parseInt(contenuDiv) >= 1 && parseInt(contenuDiv) <= 9;
    
      // if (estEntre1et9) {
      //   cy.get('div[class="board"]')
      //     .find('div[ng-reflect-ng-class="case"]')
      //     .eq(2)
      //     .find('select')
      //     .select(1);
      // } else {
      //   cy.get('div[class="autre-classe"]').should('exist');
      // }
    })
  });
})
