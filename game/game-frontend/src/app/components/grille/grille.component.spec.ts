import { Grille } from "src/app/Grille";

// describe('GrilleComponent', () => {
//   let component: GrilleComponent;
//   let fixture: ComponentFixture<GrilleComponent>;


//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ GrilleComponent ]
//     })
//     .compileComponents();
 
//     fixture = TestBed.createComponent(GrilleComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('Grille', () => {
  let grille: Grille;

  beforeEach(() => {
    grille = new Grille([
      5, 3, 0, 0, 7, 0, 0, 0, 0,
      6, 0, 0, 1, 9, 5, 0, 0, 0,
      0, 9, 8, 0, 0, 0, 0, 6, 0,
      8, 0, 0, 0, 6, 0, 0, 0, 3,
      4, 0, 0, 8, 0, 3, 0, 0, 1,
      7, 0, 0, 0, 2, 0, 0, 0, 6,
      0, 6, 0, 0, 0, 0, 2, 8, 0,
      0, 0, 0, 4, 1, 9, 0, 0, 5,
      0, 0, 0, 0, 8, 0, 0, 7, 9
    ], true);
  });

  it('should create a valid instance of Grille', () => {
    expect(grille).toBeTruthy();
  });

  it('should validate the grid when there are no errors', () => {
    expect(grille.validationGrille()).toBeTruthy();
  });

  it('should detect zeros in the grid', () => {
    expect(grille.pasDeZeros()).toBeFalsy();
  });

  it('should reset errors in the grid', () => {
    grille.cellules[0].error = true;
    grille.resetErrors();
    expect(grille.cellules[0].error).toBeFalsy();
  });

  it('should calculate brouillons for a cell equals to 0', () => {
    grille.recalculBrouillon(grille.cellules[2]);
    expect(grille.cellules[2].brouillons).toEqual([1, 2, 0, 4, 0, 0, 0, 0, 0]);
  });

  it('should recalculate brouillons for all cells', () => {
    grille.recalculTousBrouillons();
    expect(grille.cellules[2].brouillons).toEqual([1, 2, 0, 4, 0, 0, 0, 0, 0]);
  });

  it('should get values from a specific row', () => {
    const values = grille.getValeursRow(grille.getCell(4, 3));
    expect(values).toEqual([8, 0, 0, 0, 6, 0, 0, 0, 3]);
  });

  it('should get values from a specific column', () => {
    const values = grille.getValeursColumn(grille.getCell(5, 8));
    expect(values).toEqual([0, 5, 0, 0, 3, 0, 0, 9, 0]);
  });

  it('should get values from a specific case', () => {
    const values = grille.getValeursCase(grille.getCell(7, 6));
    expect(values).toEqual([2, 8, 0, 0, 0, 5, 0, 7, 9]);
  });
});
