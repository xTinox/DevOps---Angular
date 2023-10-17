import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { PartieComponent } from './components/partie/partie.component';

const routes: Routes = [

{path: 'menu', component: GameMenuComponent},
{path: 'game', component: PartieComponent},
{path: '**', redirectTo: '/menu', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
