// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { VeryHardComponent } from './very-hard.component';

// describe('VeryHardComponent', () => {
//   let component: VeryHardComponent;
//   let fixture: ComponentFixture<VeryHardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ VeryHardComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(VeryHardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeryHardComponent } from './very-hard.component';
import { SudokuService } from 'src/app/service/sudoku.service';

describe('VeryHardComponent', () => {
  let component: VeryHardComponent;
  let fixture: ComponentFixture<VeryHardComponent>;
  let sudokuServiceMock: jasmine.SpyObj<SudokuService>;

  beforeEach(() => {
    sudokuServiceMock = jasmine.createSpyObj('SudokuService', ['sudoku', 'nbGrilles', 'getScores']);
    
    TestBed.configureTestingModule({
      declarations: [VeryHardComponent],
      providers: [{ provide: SudokuService, useValue: sudokuServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(VeryHardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set random value to false when calling setRandom(false)', () => {
    component.setRandom(false);
    expect(component.random).toBeFalse();
  });

  it('should return "very-hard" when calling getNom()', () => {
    const result = component.getNom();
    expect(result).toBe('very-hard');
  });

  it('should call SudokuService.sudoku with correct parameters when calling getSudoku()', async () => {
    sudokuServiceMock.sudoku.and.returnValue(Promise.resolve('sudoku-data'));

    await component.getSudoku();

    expect(sudokuServiceMock.sudoku).toHaveBeenCalledWith('very-hard', component.random);
  });

  it('should call SudokuService.nbGrilles with correct parameters when calling getNbGrilles()', async () => {
    sudokuServiceMock.nbGrilles.and.returnValue(Promise.resolve('5'));

    await component.getNbGrilles();

    expect(sudokuServiceMock.nbGrilles).toHaveBeenCalledWith('very-hard');
  });

  it('should call SudokuService.getScores with correct parameters when calling getClassement()', async () => {
    sudokuServiceMock.getScores.and.returnValue(Promise.resolve([]));

    const playerId = 'Joueur INSA';
    await component.getClassement(playerId);

    expect(sudokuServiceMock.getScores).toHaveBeenCalledWith(playerId, 'very-hard');
  });
});

