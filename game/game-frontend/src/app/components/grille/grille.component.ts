import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Cell } from 'src/app/cell';
import { Grille } from 'src/app/Grille';
import { SudokuService } from 'src/app/service/sudoku.service';


@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})

export class GrilleComponent implements OnInit, OnChanges {

  @Input() grille?: Grille
  //@Output() finished = new EventEmitter<any>()
  
  constructor(private sudokuService : SudokuService){
  }

  ngOnInit(){
    return
  }

  ngOnChanges(): void {
    console.log("test changement")
  }
/*
  checkValue(e: any, x: number, y:number){
    this.sudokuService.currentPartie!.grille.cellules[x+9*y].valeur = e
    this.showValue(x,y)
    this.partieDone()
  }
  */

  showValue(){
    console.log(this.sudokuService.currentPartie?.grille?.getValeurs())
  }

  lectureOfCell(x: number, y: number): Cell | undefined{
    return this.sudokuService.currentPartie?.grille?.getCell(x,y)
  }
/*
  partieDone(){
    if (!this.sudokuService.currentPartie?.grille?.getValeurs().includes(0) && this.noError()){
      this.finished.emit(true)
      this.sudokuService.sendNumbers(this.sudokuService.currentPartie!.difficulte.getNom())
      this.sudokuService.sendScore(this.sudokuService.currentPartie!.idGrille,this.sudokuService.currentPartie!.difficulte.getNom(),new Score(this.sudokuService.currentPartie!.name,this.sudokuService.currentPartie!.score))
    }
  }
  */

  noError():boolean{
    let b = true
    this.sudokuService.currentPartie?.grille?.cellules.map(c => b = b && !c.error)
    return b
  }

  verifCell(x: number, y: number) : boolean | undefined{
    return this.grille?.cellules[x+9*y].error
  }

}
