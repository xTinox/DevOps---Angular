import { Component, OnInit } from '@angular/core';
import { Difficulte } from 'src/app/difficulte';
import { EasyComponent } from '../easy/easy.component';
import { HardComponent } from '../hard/hard.component';
import { InhumanComponent } from '../inhuman/inhuman.component';
import { InsaneComponent } from '../insane/insane.component';
import { MediumComponent } from '../medium/medium.component';
import { VeryHardComponent } from '../very-hard/very-hard.component';
import { SudokuService } from 'src/app/service/sudoku.service';
import { Partie } from 'src/app/Partie'
import { UndoHistory } from 'interacto';
import { Classement } from 'src/app/classement';

// Menu du jeu
// Comporte les sélections de difficulté ainsi que récupération dans le Back des grilles enregistrées pour visualiser


@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

  //attributs prévus par le diagramme de classe
  difficulte : Difficulte = new EasyComponent(this.sudokuService)
  playerName : string = ''
  suggestion : boolean = false
  classement : Classement = Classement.INSTANCE

  //attribue rajouter selon les nouveaux besoins révélés par l'implémentation
  difficulteChoisie = 0
  condition : boolean = true
  tabDifficulte : Array<Difficulte> = []
  part? : Partie

  public nbGrilles: number = 0
  public listeIndexGrilles: Array<number> = []
  public listeNombresGrilles: Array<Array<number>> = []
  public listeImgGrilles: Array<HTMLImageElement> = []
  imageIndex: number = 0;
  grilleCourante?: HTMLImageElement;

  constructor(private sudokuService : SudokuService, public undoHistory: UndoHistory) {
  }

  //par défaut, les instances de difficulté permettent de récupérer seulement les sudoku random, il faut set leur attribut random à false pour avoir des sudoku déjà fait du backend
  ngOnInit(): void {
    this.condition = true
    this.tabDifficulte[0] = new EasyComponent(this.sudokuService)
    this.tabDifficulte[1] = new MediumComponent(this.sudokuService)
    this.tabDifficulte[2] = new HardComponent(this.sudokuService)
    this.tabDifficulte[3] = new VeryHardComponent(this.sudokuService)
    this.tabDifficulte[4] = new InsaneComponent(this.sudokuService)
    this.tabDifficulte[5] = new InhumanComponent(this.sudokuService)
    this.loadDiff()
  }

  difficultesChoix = [{ id: 0, name: 'easy' },
  { id: 1, name: 'medium' },
  { id: 2, name: 'hard' },
  { id: 3, name: 'very-hard' },
  { id: 4, name: 'insane' },
  { id: 5, name: 'inhuman' }]

  setPlayerName(name : string){
    this.playerName = name
  }

  setSuggestion(){
    this.suggestion = !this.suggestion
    return this.suggestion
  }

  generatePartieRandom(){
    this.undoHistory.clear()
    //nom par défaut si le joueur n'en a pas saisi
    if(!this.playerName){
      this.playerName = "player"
    }
    this.part = new Partie(this.playerName, this.difficulte, true)
    this.part.affichageBrouillons = this.suggestion
    this.sudokuService.currentPartie = this.part
  }

  generatePartie(){
    this.undoHistory.clear()
    if(!this.playerName){
      this.playerName = "player"
    }
    this.difficulte.setRandom(false)
    this.part = new Partie(this.playerName, this.difficulte, false)
    this.part.affichageBrouillons = this.suggestion
    this.sudokuService.currentPartie = this.part
    console.log(this.part.isRandom)
  }

  setDifficulte(value : number){
    this.difficulte = this.tabDifficulte[value]
  }

  async loadDiff(): Promise<void> {
    this.imageIndex = 0
    this.grilleCourante = undefined
    this.listeNombresGrilles = []
    this.listeImgGrilles = []
    this.nbGrilles = +(await this.sudokuService.nbGrilles(this.difficultesChoix[this.difficulteChoisie].name)) - 1;
    console.log(this.nbGrilles);
    this.listeIndexGrilles = Array(this.nbGrilles).fill(0).map((x,i)=>i)
    console.log(this.listeIndexGrilles);
    for(let i=0; i<this.nbGrilles; i++){
      const str = await this.sudokuService.sudoku(this.difficultesChoix[this.difficulteChoisie].name, false)
      const str1: string[] = (str.substring(str.length-81,str.length)).split('')
      const chiffres: Array<number> = []
      str1.forEach(value => chiffres.push(Number(value)))
      if(!this.listeNombresGrilles.includes(chiffres)){
        this.listeNombresGrilles.push(chiffres)
        this.listeImgGrilles.push(this.getImages(this.listeNombresGrilles[i]))
      }
    }
    if(this.listeImgGrilles.length) this.grilleCourante = this.listeImgGrilles[0]
    console.log(this.listeNombresGrilles)
  }


  public getImages(nombres: Array<number>): HTMLImageElement {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const tileSize = 27;
    canvas.width = 250;
    canvas.height = 250;
    ctx.font = '25px Bodo';
    ctx.fillStyle = 'black';
    for (let i = 0; i < nombres.length; i++){
        const nb = nombres[i]
        if(nb){
            ctx.fillText(nb.toString() ?? "", (i % 9) * tileSize + 7.5, Math.floor(i / 9) * tileSize + 21.25);
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

  precedGrille(){
    this.imageIndex = (this.imageIndex - 1 + this.nbGrilles) % this.nbGrilles
    this.grilleCourante = this.listeImgGrilles[this.imageIndex]
    console.log(this.imageIndex);
    
  }

  suivGrille(){
    this.imageIndex = (this.imageIndex + 1 + this.nbGrilles) % this.nbGrilles
    this.grilleCourante = this.listeImgGrilles[this.imageIndex]
    console.log(this.imageIndex);
  }

  
}
