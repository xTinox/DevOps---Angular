// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { GameMenuComponent } from './game-menu.component';

// describe('GameMenuComponent', () => {
//   let component: GameMenuComponent;
//   let fixture: ComponentFixture<GameMenuComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ GameMenuComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(GameMenuComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameMenuComponent } from './game-menu.component';
import { SudokuService } from 'src/app/service/sudoku.service';
import { UndoHistory } from 'interacto';

describe('GameMenuComponent', () => {
  let component: GameMenuComponent;
  let fixture: ComponentFixture<GameMenuComponent>;
  let sudokuServiceMock: jasmine.SpyObj<SudokuService>;

  beforeEach(() => {
    sudokuServiceMock = jasmine.createSpyObj('SudokuService', ['nbGrilles', 'sudoku', 'currentPartie']);
    
    TestBed.configureTestingModule({
      declarations: [GameMenuComponent],
      providers: [
        { provide: SudokuService, useValue: sudokuServiceMock },
        UndoHistory,
      ]
    });

    fixture = TestBed.createComponent(GameMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set player name', () => {
    const playerName = 'Emilie';
    component.setPlayerName(playerName);
    expect(component.playerName).toEqual(playerName);
  });

  it('should toggle suggestion', () => {
    const initialSuggestion = component.suggestion;
    const result = component.setSuggestion();
    expect(result).toEqual(!initialSuggestion);
  });

  it('should set difficulty', () => {
    const difficultyIndex = 2;
    component.setDifficulte(difficultyIndex);
    expect(component.difficulte).toEqual(component.tabDifficulte[difficultyIndex]);
  });
});