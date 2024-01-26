import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SudokuService } from 'src/app/service/sudoku.service';
import { Classement } from 'src/app/classement';
import { Score } from 'src/app/score';

// Classement de la partie en cours 

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {

  public classment: Array<Score> = Classement.INSTANCE.scores
  public sizeClassement = 0;
  public nbJoueurs: Array<number> = []

  constructor(public sudokuService: SudokuService,public dialog: MatDialogRef<ClassementComponent>) {
    /*this.classment.push(new Score("Baptiste", 14))
    this.classment.push(new Score("Baptistou", 1645))
    this.classment.push(new Score("Baptista", 8))
    this.classment.push(new Score("Baptou", 564))*/



    if(this.classment.length < 5) this.sizeClassement = this.classment.length
    else this.sizeClassement = 5

    for(let i=0; i<=this.sizeClassement-1; i++) this.nbJoueurs.push(i)
  }

  ngOnInit(): void {
    return
  }

}
