import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {InteractoModule, interactoTreeUndoProviders} from "interacto-angular";
import { GrilleComponent } from './components/grille/grille.component';
import { CellComponent } from './components/cell/cell.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { PartieComponent } from './components/partie/partie.component';
import { EasyComponent } from './components/easy/easy.component';
import { MediumComponent } from './components/medium/medium.component';
import { VeryHardComponent } from './components/very-hard/very-hard.component';
import { InsaneComponent } from './components/insane/insane.component';
import { HardComponent } from './components/hard/hard.component';
import { InhumanComponent } from './components/inhuman/inhuman.component';
import { ClassementComponent } from './components/classement/classement.component';
import { SudokuService } from "./service/sudoku.service";
import { FinishedComponent } from './components/finished/finished.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
        GrilleComponent,
        CellComponent,
        GameMenuComponent,
        PartieComponent,
        EasyComponent,
        MediumComponent,
        VeryHardComponent,
        InsaneComponent,
        HardComponent,
        InhumanComponent,
        ClassementComponent,
        FinishedComponent
    ],
    providers: [interactoTreeUndoProviders(true), SudokuService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        InteractoModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class AppModule {
}
