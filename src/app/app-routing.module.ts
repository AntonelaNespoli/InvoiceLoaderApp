import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { HomeComponent } from './components/home/home.component'
import { TableTotalsComponent } from './components/table-totals/table-totals.component'

const ROUTES: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'invoicesProcessed', component: TableTotalsComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
