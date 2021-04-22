import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSellComponent } from './components/modals/modal-sell/modal-sell.component';
import { ModalAddMoneyComponent } from './components/modals/modal-add-money/modal-add-money.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalTakeOutMoneyComponent } from './components/modals/modal-take-out-money/modal-take-out-money.component';
import { ModalWatchComponent } from './components/modals/modal-watch/modal-watch.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvestmentsComponent,
    WatchlistComponent,
    ShoppingComponent,
    ModalSellComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ModalAddMoneyComponent,
    ModalTakeOutMoneyComponent,
    ModalWatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
