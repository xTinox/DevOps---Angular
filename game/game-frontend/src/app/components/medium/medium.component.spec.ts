// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MediumComponent } from './medium.component';

// describe('MediumComponent', () => {
//   let component: MediumComponent;
//   let fixture: ComponentFixture<MediumComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ MediumComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MediumComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediumComponent } from './medium.component';
import { SudokuService } from 'src/app/service/sudoku.service';

describe('MediumComponent', () => {
  let component: MediumComponent;
  let fixture: ComponentFixture<MediumComponent>;
  let sudokuServiceMock: jasmine.SpyObj<SudokuService>;

  beforeEach(() => {
    sudokuServiceMock = jasmine.createSpyObj('SudokuService', ['sudoku', 'nbGrilles', 'getScores']);
    
    TestBed.configureTestingModule({
      declarations: [MediumComponent],
      providers: [{ provide: SudokuService, useValue: sudokuServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(MediumComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set random value to false when calling setRandom(false)', () => {
    component.setRandom(false);
    expect(component.random).toBeFalse();
  });

  it('should return "medium" when calling getNom()', () => {
    const result = component.getNom();
    expect(result).toBe('medium');
  });

  it('should call SudokuService.sudoku with correct parameters when calling getSudoku()', async () => {
    sudokuServiceMock.sudoku.and.returnValue(Promise.resolve('sudoku-data'));

    await component.getSudoku();

    expect(sudokuServiceMock.sudoku).toHaveBeenCalledWith('medium', component.random);
  });

  it('should call SudokuService.nbGrilles with correct parameters when calling getNbGrilles()', async () => {
    sudokuServiceMock.nbGrilles.and.returnValue(Promise.resolve('5'));

    await component.getNbGrilles();

    expect(sudokuServiceMock.nbGrilles).toHaveBeenCalledWith('medium');
  });

  it('should call SudokuService.getScores with correct parameters when calling getClassement()', async () => {
    sudokuServiceMock.getScores.and.returnValue(Promise.resolve([]));

    const playerId = 'Joueur INSA';
    await component.getClassement(playerId);

    expect(sudokuServiceMock.getScores).toHaveBeenCalledWith(playerId, 'medium');
  });
});


