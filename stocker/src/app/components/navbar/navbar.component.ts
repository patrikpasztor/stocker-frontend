import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { UserService } from '../../services/user.service';
import { IStockSymbol } from 'src/app/models/stocksymbol';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public stocks : IStockSymbol[] = [];

  constructor(private stockService: StockService, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.fillStocks();
  }

  async fillStocks() {
    this.stocks = await this.stockService.getStocks().toPromise();
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  getLoggedInUsername() {
    return this.userService.getLoggedInUsername()
  }
}
