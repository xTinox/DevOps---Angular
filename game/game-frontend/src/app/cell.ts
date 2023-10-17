import { InterfaceCell } from "src/interface-cell";


// Model Cell
// Ici nous avons appelé les indices , les 'brouillons' 

export class Cell implements InterfaceCell{

    valeur: number;
    brouillons: number[] = [];
    lecture: boolean;
    indice: number;
    affichageBrouillons: boolean = false
    error: boolean = false
    miseErrorAlone: boolean = false
    mem: number = -1
    
    constructor(v: number, b: number[], l: boolean, i: number, aff: boolean){
        this.valeur = v
        this.lecture = l
        this.indice = i
        this.affichageBrouillons = aff
    }

    getBrouillonsWithoutZeros() : number[]{
        let withoutZero : number[] = []
        this.brouillons.map(v => {
            if(v!=0) withoutZero.push(v)
        })
        //console.log(withoutZero[0])
        return withoutZero
    }


    
}