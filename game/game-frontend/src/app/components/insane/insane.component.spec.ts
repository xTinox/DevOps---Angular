// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { InsaneComponent } from './insane.component';

// describe('InsaneComponent', () => {
//   let component: InsaneComponent;
//   let fixture: ComponentFixture<InsaneComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ InsaneComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(InsaneComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsaneComponent } from './insane.component';
import { SudokuService } from 'src/app/service/sudoku.service';

describe('InsaneComponent', () => {
  let component: InsaneComponent;
  let fixture: ComponentFixture<InsaneComponent>;
  let sudokuServiceMock: jasmine.SpyObj<SudokuService>;

  beforeEach(() => {
    sudokuServiceMock = jasmine.createSpyObj('SudokuService', ['sudoku', 'nbGrilles', 'getScores']);
    
    TestBed.configureTestingModule({
      declarations: [InsaneComponent],
      providers: [{ provide: SudokuService, useValue: sudokuServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(InsaneComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set random value to false when calling setRandom(false)', () => {
    component.setRandom(false);
    expect(component.random).toBeFalse();
  });

  it('should return "insane" when calling getNom()', () => {
    const result = component.getNom();
    expect(result).toBe('insane');
  });

  it('should call SudokuService.sudoku with correct parameters when calling getSudoku()', async () => {
    sudokuServiceMock.sudoku.and.returnValue(Promise.resolve('sudoku-data'));

    await component.getSudoku();

    expect(sudokuServiceMock.sudoku).toHaveBeenCalledWith('insane', component.random);
  });

  it('should call SudokuService.nbGrilles with correct parameters when calling getNbGrilles()', async () => {
    sudokuServiceMock.nbGrilles.and.returnValue(Promise.resolve('5'));

    await component.getNbGrilles();

    expect(sudokuServiceMock.nbGrilles).toHaveBeenCalledWith('insane');
  });

  it('should call SudokuService.getScores with correct parameters when calling getClassement()', async () => {
    sudokuServiceMock.getScores.and.returnValue(Promise.resolve([]));

    const playerId = 'Joueur INSA';
    await component.getClassement(playerId);

    expect(sudokuServiceMock.getScores).toHaveBeenCalledWith(playerId, 'insane');
  });
});