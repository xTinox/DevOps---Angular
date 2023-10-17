import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';
import { MatDialogRef } from '@angular/material/dialog'

//Composant Finished qui envoie au Back les données de la grille nécessaire (ici nous n'avons pas utilisé de DTO mais deux routes pour l'envoi)

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {

  constructor(public sudokuService : SudokuService, public dialog: MatDialogRef<FinishedComponent>) { }

  ngOnInit(): void {
    if(this.sudokuService.currentPartie?.isRandom){
      this.sudokuService.sendNumbers(this.sudokuService.currentPartie!.difficulte.getNom())
    }
    this.sudokuService.sendScore(this.sudokuService.currentPartie!.idGrille,this.sudokuService.currentPartie!.difficulte.getNom(),new Score(this.sudokuService.currentPartie!.name,this.sudokuService.currentPartie!.score))
  }

  retourMenu() : void{
    this.dialog.close();
  }

}
