import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';
@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css']
})
export class HardComponent implements OnInit, Difficulte {


  random : boolean= true

  setRandom(value : boolean):void{
    this.random = value
  }

  constructor(private sudokuService : SudokuService) { }

  getNom(): string {
    return "hard"
  }
  
  getSudoku(): Promise<any> {
    return this.sudokuService.sudoku("hard", this.random)
  }

  getNbGrilles(): Promise<string> {
    return this.sudokuService.nbGrilles("hard")
  }

  ngOnInit(): void {
  }

  getClassement(id : string):Promise<Array<Score>>{
    return this.sudokuService.getScores(id, "hard")
  }

}
