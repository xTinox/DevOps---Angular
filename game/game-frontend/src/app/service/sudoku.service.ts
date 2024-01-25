import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Partie } from 'src/app/Partie';
import { Score } from 'src/app/score';


// Le service possède une partie courante et propose tout type de fonction concernant l'envoi et la réception de données avec le Back-end (sauf la récupération de Grille (voir Partie.ts))

@Injectable({
  providedIn: 'root'
})

export class SudokuService {

  currentPartie? : Partie = undefined

  constructor(private http: HttpClient) { }

  sudoku(diff : string, random : boolean) : Promise<any>{
    if(!random){
      return lastValueFrom(this.http.get('api/sudoku/grids/'+diff,{'responseType': "text"}))
    }else{
      return lastValueFrom(this.http.get('sudoku-provider/'+diff,{'responseType': "text"}))
    }
  }

  nbGrilles(diff : string) : Promise<any>{
      return lastValueFrom(this.http.get('api/sudoku/grids/nbGrille/'+diff,{'responseType': "text"}))
  }

  async sendNumbers(diff: String) : Promise<void>{
    try {
      return await lastValueFrom(this.http
        .post<void>('api/sudoku/grid/register/'+diff, JSON.stringify(this.currentPartie?.chiffresInitiales)));
    } catch (err) {
      return console.log("La grille n'a pas pu être enregistrée");
    }
  }

  async sendScore(id: string, diff: string, score: Score) : Promise<void>{
    try{
      return await lastValueFrom(this.http
        .post<void>('api/sudoku/score/'+id+'/'+diff,score))
    } catch (err){
      return console.log(score);
    }
  }

  getScores(id : string, dif : string) : Promise<Array<Score>>{
    return lastValueFrom(this.http.get<Array<Score>>('api/sudoku/classement/'+id+'/'+dif))
  }

  get partieAlreadyCreated(): boolean{
    return this.currentPartie != undefined
  }

  createPartie(p : Partie) : void {
    if(this.partieAlreadyCreated){
      this.currentPartie = p
    }
  }

  getName() : any{
    return this.currentPartie?.name
  }

  partieFinie() : boolean{
    return this.currentPartie!.fini
  }
}
