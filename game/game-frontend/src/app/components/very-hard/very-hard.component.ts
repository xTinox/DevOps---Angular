import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';
@Component({
  selector: 'app-very-hard',
  templateUrl: './very-hard.component.html',
  styleUrls: ['./very-hard.component.css']
})
export class VeryHardComponent implements OnInit, Difficulte {

  random : boolean= true

  setRandom(value : boolean):void{
    this.random = value
  }

  constructor(private sudokuService : SudokuService) { }

  getNom(): string {
    return "very-hard"
  }
  
  getSudoku(): Promise<string> {
    return this.sudokuService.sudoku("very-hard", this.random)
  }

  getNbGrilles(): Promise<string> {
    return this.sudokuService.nbGrilles("very-hard")
  }

  ngOnInit(): void {
  }

  getClassement(id : string):Promise<Array<Score>>{
    return this.sudokuService.getScores(id, "very-hard")
  }

}
