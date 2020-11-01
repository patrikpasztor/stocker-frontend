import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {path: 'investments', component: InvestmentsComponent},
  {path: 'watchlist', component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
