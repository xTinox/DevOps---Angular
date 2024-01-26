import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/service/sudoku.service';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { SetValue } from 'src/app/setvalue';
import { UndoableSnapshot } from 'interacto';
import { MatDialog } from '@angular/material/dialog'
import { FinishedComponent } from '../finished/finished.component';
import { ClassementComponent } from '../classement/classement.component';

// Composant Partie (après clic sur Générer Partie depuis le Menu)
// Elle se compose de tous les éléments nécessaires à la partie

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit {

  name : string = ""
  chiffres: number[] = []
  initial: boolean[] = []

  fini : boolean = false
  afficheFin: boolean = true

  constructor(public sudokuService : SudokuService, public matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, public dialog: MatDialog) { 
    this.matIconRegistry.addSvgIcon("rank", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/ranking.svg"))
  }
  ngOnInit(): void {
    if(this.sudokuService.currentPartie){
      this.name = this.sudokuService.currentPartie.name
    }
  }

  public rootRenderer(): UndoableSnapshot {
    return SetValue.getSnapshot(this.sudokuService.currentPartie);
  }

  openClassement(): void{
    this.dialog.open(ClassementComponent,{
      panelClass: 'custom-dialog'
    })
  }

  openFinished(): void{
    if(this.afficheFin){
      this.dialog.open(FinishedComponent)
      this.afficheFin = false
    }
  }
 
/*
  async ngOnInit(): Promise<void> {
    this.sudokuService.currentPartie
    this.c = await this.partie?.difficulte.getSudoku()
    let str: string[] = BigInt(this.c).toString().split('')
    str.forEach(value => this.chiffres.push(Number(value)))
    this.grille = new Grille(this.chiffres)
    this.grille.cellules.forEach(v => console.log(v.valeur))
  }
  /*
  showGrille() : void {
    let str : string[] | undefined
    str = this.c.toString().split('')
    str?.forEach(value => this.chiffres.push(Number(value)))
    console.log(this.chiffres)
  }
  */
}
