import { Score } from "./score"

export interface Difficulte {
    getNom(): string
    getSudoku() : Promise<string>
    setRandom(value : boolean) : void
    getNbGrilles() : Promise<string>
    getClassement(id : string) : Promise<Array<Score>>
}
