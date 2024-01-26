import { UndoableCommand } from "interacto";
import { Partie } from "./Partie";

export class SetValue extends UndoableCommand {

    private oldValue: number = 0

    public constructor(private nombre: number, private index: number, private game: Partie) {
        super();
    }

    // Fonction d'actualisation de la grille
    public actualise() : void{
        console.log("Avant"+this.oldValue)
        console.log("Maintenant"+this.nombre)
        this.game.grille.resetErrors()
        this.game.grille.recalculTousBrouillons()
        this.game.grille.checkValidite(this.game.grille.cellules[this.index])
        if(this.game.grille.validationGrille() && this.game.grille.pasDeZeros()){
            this.game.fini = true
        }
    }

    protected override createMemento() {
        this.oldValue = this.game.grille.cellules[this.index].valeur;
    }

    public override canExecute(): boolean {
        //this.oldValue = this.nombre;
        this.game.score +=1 
        return this.game.grille.cellules[this.index].valeur != this.game.grille.cellules[this.index].mem;
    }

    protected execution(): void {
        this.game.grille.cellules[this.index].valeur = this.nombre
        this.actualise()
        console.log("ACTION");
    }
    public undo(): void {
        this.game.grille.cellules[this.index].valeur = this.oldValue
        this.actualise()
        console.log("undo");
        
    }
    public redo(): void {
        this.game.grille.cellules[this.index].valeur = this.nombre
        this.actualise()
        console.log("redo");
    }

    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
        return SetValue.getSnapshot(this.game, this.index);
    }

    // Prendre un snapshot de la grille courante
    public static getSnapshot(partie?: Partie, indexChanged?: number): HTMLImageElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tileSize = 110;
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';

        //if(indexChanged != undefined && partie!.grille.cellules[indexChanged!].brouillons.length>1) canvas.style.backgroundColor = 'purple'

        for (let i = 0; i < partie!.grille.cellules.length; i++){
            if (i===indexChanged){
                if(!partie!.grille.cellules[i].error){
                    ctx.fillStyle = 'green';
                }
                else{
                    ctx.fillStyle = 'red';
                }
            }else{
                ctx.fillStyle = 'black';
            }
            const nb = partie!.grille.getValeurs()[i]
            if(nb){
                ctx.fillText(nb.toString() ?? "", (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
            }
            
        }
      
        for(let i = 1; i < 9; i++) {
            ctx.moveTo(i * tileSize, 0);
            ctx.lineTo(i * tileSize, canvas.height);
            ctx.moveTo(0, i * tileSize);
            ctx.lineTo(canvas.width, i * tileSize);
        }
        ctx.stroke(); // Draw the content
        const imgCache = new Image();
        imgCache.src = canvas.toDataURL("image/png");
        return imgCache;
    }
}