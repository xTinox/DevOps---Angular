import { Component, Input, OnInit } from '@angular/core';
import { PartialPointBinder, PartialSelectBinder } from 'interacto';

import { Cell } from 'src/app/cell';
import { SudokuService } from 'src/app/service/sudoku.service';
import { SetValue } from 'src/app/setvalue';

//Composant Cell qui contient l

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  
  @Input() cell?: Cell
  //@Output() sent = new EventEmitter<any>()

  constructor(public sudokuService : SudokuService) { 
  }

  ngOnInit(): void {
  }


  values() : number[] {
    return [1,2,3,4,5,6,7,8,9]
  }
/*
  actualise(){
    this.sudokuService.currentPartie?.grille.resetErrors()
    this.sudokuService.currentPartie?.grille.recalculTousBrouillons()
    this.sudokuService.currentPartie?.grille.checkValidite(this.cell!)
  }

  sendValue(e : any) : void{
    this.sudokuService.currentPartie!.score += 1
    //this.cell!.valeur = Number(e.value)
    this.cell!.valeur = Number(e.target.value)
    this.actualise()
    //this.sudokuService.currentPartie?.grille.getValeurs()
    this.sent.emit(this.cell?.valeur)
  }
*/

  public setValue(binder: PartialSelectBinder) {
    binder
    .toProduce(i => new SetValue(Number(i.widget?.value), this.cell!.indice, this.sudokuService.currentPartie!))
    .bind();
  }

  public directSet(binder: PartialPointBinder) {
    binder
    .toProduce(() => new SetValue(this.cell!.getBrouillonsWithoutZeros()[0], this.cell!.indice, this.sudokuService.currentPartie!))
    .when(i => i.button === 2 && this.cell?.getBrouillonsWithoutZeros().length! >= 1)
    .bind();
  }
  
}
