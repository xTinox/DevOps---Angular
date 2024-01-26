import { InterfaceGrille } from "src/interface-cell"
import { Cell } from "./cell";

// Model Grille
// Construit les cellules 'Cell'
// Possede les fonctions de verification et de modification

export class Grille implements InterfaceGrille{

    cellules: Cell[] = []

    constructor(c : number[], aff: boolean){
        let index = 0
        c.forEach(val => {
            if (val===0){
                this.cellules.push(new Cell(val,[],false,index++,aff))
            } else{
                this.cellules.push(new Cell(val,[],true,index++,false))
            }
        })
        this.recalculTousBrouillons()
    }

    validationGrille() : boolean{
        let b = true
        this.cellules.map(c => b = b && !c.error)
        return b
    }

    pasDeZeros() : boolean{
        let zero = false
        this.cellules.map(c => {
            if (c.valeur == 0){
                zero = true
            }
        })
        return !zero
    }

    check(c : Cell, cell : Cell) : void{
        /*
        if (c!=cell && c.valeur==cell.valeur && cell.valeur!==0){
            c.error = true
            cell.error = true
            cell.miseErrorAlone = true
        }

        else{
            c.error = false
            c.miseErrorAlone = false
        }
        */

        if (c!=cell && c.valeur==cell.valeur && cell.valeur !== 0){
            c.error = true
            cell.error = true
        } else if(!c.lecture && c.error && c.valeur !== 0 && c==cell){c.error = true}
        else{c.error = false}
        
    }

    checkValidite(cell: Cell) : void{
        this.getRow(cell).map(c => this.check(c,cell))
        this.getColumn(cell).map(c => this.check(c,cell))
        this.getCase(cell).map(c => this.check(c,cell))
    }

    resetErrors(){
        this.cellules.map(c => {
            if(c.lecture || !c.miseErrorAlone) c.error = false
        })
    }

    recalculBrouillon(cell: Cell) {
        const b = []
        const existants = this.getValeursRow(cell).concat(this.getValeursColumn(cell).concat(this.getValeursCase(cell)))
        for(const val of [1,2,3,4,5,6,7,8,9]){
          if (!existants.includes(Number(val))){
              b.push(Number(val))
          }
          else{b.push(0)}
        }
        cell.brouillons = b
    }

    recalculTousBrouillons(){
        this.cellules.forEach(c => this.recalculBrouillon(c))
    }

    getValeursCase(cell: Cell) : number[]{
        return this.getCase(cell).map(c => c.valeur)
    }

    getValeursRow(cell : Cell) : number[]{
        return this.getRow(cell).map(c => c.valeur)
    }

    getValeursColumn(cell : Cell) : number[]{
        return this.getColumn(cell).map(c => c.valeur)
    }

    getCase(cell : Cell) : Cell[]{
        const case33: Cell[] = []
        let row = ~~(cell.indice/9)
        let col = cell.indice%9
        row = row - row%3
        col = col - col%3
        
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                case33.push(this.cellules[(col+j) + (row+i)*9])
            }
        }
        return case33
    }

    getRow(cell : Cell) : Cell[] {
        const r = cell.indice-cell.indice%9
        return this.cellules.slice(r,r+9)
    }

    getColumn(cell : Cell) : Cell[] {
        const col : Cell[] = []
        for (let r=0; r<9; r++){
            col.push(this.cellules[r*9+cell.indice%9])
        }
        return col
    }

    getCells() : Cell[]{
        return this.cellules
    }

    getCell(i: number, j?: number) : Cell {
        if (j !== undefined){
            return this.cellules[i+9*j]
        } else { return this.cellules[i] }
    }

    getValeurs(): number[]{
        const valeurs: number[] = []
        this.cellules.forEach(val => valeurs.push(val.valeur))
        return valeurs
    }

    getValeursString(): string{
        let valeurs: string = ""
        this.cellules.forEach(val => valeurs += String(val.valeur))
        return valeurs
    }

    getValeur(i: number, j?: number) : number {
        if (j !== undefined){
            return this.cellules[i+9*j].valeur
        } else { return this.cellules[i].valeur }
    }
}