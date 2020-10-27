import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';

const routes: Routes = [
  {path: 'investments', component: InvestmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
