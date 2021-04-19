import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsComponent } from './components/investments/investments.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'investments', component: InvestmentsComponent, canActivate:[AuthGuardService]},
  {path: 'watchlist', component: WatchlistComponent, canActivate:[AuthGuardService]},
  {path: 'shopping', component: ShoppingComponent, canActivate:[AuthGuardService]},
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
