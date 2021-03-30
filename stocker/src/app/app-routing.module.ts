import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsComponent } from './components/investments/investments.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

const routes: Routes = [
  {path: 'investments', component: InvestmentsComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'shopping', component: ShoppingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
