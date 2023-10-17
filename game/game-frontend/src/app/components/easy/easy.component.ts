import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css']
})
export class EasyComponent implements OnInit, Difficulte {

  random : boolean= true

  setRandom(value : boolean):void{
    this.random = value
  }

  constructor(private sudokuService : SudokuService) {}

  getNom(): string {
    return "easy"
  }
 
  getSudoku(): Promise<any> {
    return this.sudokuService.sudoku("easy", this.random)
  }

  getNbGrilles(): Promise<String> {
    return this.sudokuService.nbGrilles("easy")
  }

  ngOnInit(): void {
  
  }

  getClassement(id : string):Promise<Array<Score>>{
    return this.sudokuService.getScores(id, "easy")
  }

}
