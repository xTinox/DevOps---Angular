import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { Score } from 'src/app/score';
import { SudokuService } from 'src/app/service/sudoku.service';
@Component({
  selector: 'app-insane',
  templateUrl: './insane.component.html',
  styleUrls: ['./insane.component.css']
})
export class InsaneComponent implements OnInit, Difficulte {

  random : boolean= true

  setRandom(value : boolean):void{
    this.random = value
  }

  constructor(private sudokuService : SudokuService) { }
  getNom(): string {
    return "insane"
  }
  
  getSudoku(): Promise<any> {
    return this.sudokuService.sudoku("insane", this.random)
  }

  getNbGrilles(): Promise<string> {
    return this.sudokuService.nbGrilles("insane")
  }

  ngOnInit(): void {
  }

  getClassement(id : string):Promise<Array<Score>>{
    return this.sudokuService.getScores(id, "insane")
  }


}
