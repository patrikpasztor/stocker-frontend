import { Component, Input, OnInit } from '@angular/core';
import { StockDTO } from 'src/app/models/stockDTO';
import { IStockQuote } from 'src/app/models/stockQuote';
import { StockService } from 'src/app/services/stock.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

  user: User;
  stocks: StockDTO[] = [];

  constructor(private userService: UserService, private stockService: StockService) { }

  async ngOnInit() {
    this.user = this.userService.getLoggedInUser();
    await this.getOwnedStocks();
    this.updateStockPrice();
    console.log(this.stocks)
  }

  async getOwnedStocks() {
    this.stocks = await this.userService.getOwnedStocks(this.user.name).toPromise();
  }

  getStockValue(count: number, price: number) : string {
    let value = count * price;
    return value.toString();
  }

  getProfitInPercent(count: number, buyingPrice: number, currentPrice: number) : string {
    let profit = (((count * currentPrice) / (count * buyingPrice)) - 1) * 100;
    return profit < 0 ? profit.toPrecision(2) : '+' + profit.toPrecision(2);
  }

   updateStockPrice() {
     this.stocks.forEach(async s => {
       let stockPrice = await this.stockService.getStockPrice(s.symbol).toPromise()
       s.price = stockPrice.c;
     })
   }
}
