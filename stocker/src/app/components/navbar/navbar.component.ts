import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { StockService } from '../../services/stock.service';
import { UserService } from '../../services/user.service';
import { IStockSymbol } from 'src/app/models/stocksymbol';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public stocks : IStockSymbol[] = [];
  user: User;

  constructor(private stockService: StockService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
    this.fillStocks();
  }

  async fillStocks() {
    this.stocks = await this.stockService.getStocks().toPromise();
  }

}
