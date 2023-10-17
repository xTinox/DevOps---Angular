import { Injectable } from "@angular/core"
import { Difficulte } from "./difficulte"
import { Score } from "./score"

@Injectable({
    providedIn: 'root'
  })

//Classement en single Instance

export class Classement{

    // tant que le back end n'est pas implémenté on initialise scores à un tableau vide
    dif?:Difficulte = undefined
    scores: Array<Score> = []//new Score("Tino", 19)]
    public static INSTANCE : Classement = new Classement()

    private constructor() { 
    }

    ngOnInit(): void {
    }

    setScore(s : Score) : void{
        this.scores.push(s)
    }

    getScores() : Array<Score>{
        return this.scores
    }

    majDif(d : Difficulte) : void{
        this.dif = d
    }

    async majScores(id : string) : Promise<void>{
        await this.dif!.getClassement(id)
            .then(s => {this.scores = s})
            .catch(()=>{console.log("erreur récup classement")})
    }

}