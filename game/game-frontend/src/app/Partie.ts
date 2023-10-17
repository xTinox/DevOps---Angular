import { Difficulte } from "./difficulte"
import { Grille } from "src/app/Grille"
import { Classement } from "./classement"

export class Partie{

    name : string
    score : number = 0
    difficulte : Difficulte
    grille : Grille = new Grille([],false)
    chiffres: number[] = []
    chiffresInitiales: string = ""
    affichageBrouillons: boolean = false
    idGrille: string = ""
    isRandom: boolean = true
    fini: boolean = false
    

    constructor(n : string, d : Difficulte, r : boolean){
        this.name = n
        this.difficulte = d
        this.isRandom = r
        this.recupChiffres()
    }

    // Recupération d'une grille stockée ou sur le serveur + conversions associées
    async recupChiffres() : Promise<void> {
        try{
            let str: string = BigInt(await this.difficulte.getSudoku()
            .then(v => v)
            .catch(() => "940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
            .toString()
            if (!this.isRandom){
                console.log("pas random")
                this.idGrille = str.substring(0,str.length-81)
                str = str.substring(str.length-81,str.length)
                console.log(this.idGrille)                
            }
            else{
                let id: string = BigInt(await this.difficulte.getNbGrilles()
                .then(v => v)
                .catch(() => "940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .toString()
                this.idGrille = id
            }
            this.chiffresInitiales = str
            console.log(this.chiffresInitiales)
            let str1: string[] = str.split('')
            str1.forEach(value => this.chiffres.push(Number(value)))
            this.grille = new Grille(this.chiffres,this.affichageBrouillons)
            Classement.INSTANCE.majDif(this.difficulte)
            Classement.INSTANCE.majScores(this.idGrille)
        }catch(e){
            console.log(e)
        }
    }

}