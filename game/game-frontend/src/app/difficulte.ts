import { Score } from "./score"

export interface Difficulte {
    getNom(): string
    getSudoku() : Promise<any>
    setRandom(value : boolean) : void
    getNbGrilles() : Promise<any>
    getClassement(id : string) : Promise<Array<Score>>
}
