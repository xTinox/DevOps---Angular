import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';
@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css']
})
export class MediumComponent implements OnInit, Difficulte {


  random : boolean= true

  setRandom(value : boolean):void{
    this.random = value
  }

  constructor(private sudokuService : SudokuService) { }
  getNom(): string {
    return "medium"
  }
  
  getSudoku(): Promise<string> {
    return this.sudokuService.sudoku("medium", this.random)
  }

  getNbGrilles(): Promise<string> {
    return this.sudokuService.nbGrilles("medium")
  }

  ngOnInit(): void {
    return
  }

  getClassement(id : string):Promise<Array<Score>>{
    return this.sudokuService.getScores(id, "medium")
  }

}
