import { Component, Input, OnInit } from '@angular/core';
import { IStockQuote } from 'src/app/models/stockQuote';
import { IStockSymbol } from 'src/app/models/stocksymbol';
import { Transaction } from 'src/app/models/transaction';
import { User } from 'src/app/models/user';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  user: User;
  stocks: IStockSymbol[] = [];
  selectedStock: string = 'TSLA';
  stockPrice: IStockQuote;
  amount: number = 0;
  sum: number = 0;


  constructor(private userService: UserService, private stockService: StockService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    this.stocks = history.state.data;
    this.updateStockPrice();
  }

  async updateStockPrice() {
    this.stockPrice = await this.stockService.getStockPrice(this.selectedStock).toPromise();
  }

  calcSum() {
    this.sum = this.stockPrice.c * this.amount;
  }

  async stockChanged() {
    await this.updateStockPrice();
    this.calcSum();
  }

  async buy() {
    console.log("megvesszük: " + this.selectedStock)
    let stockPrice : IStockQuote = await this.stockService.getStockPrice(this.selectedStock).toPromise();
    let transaction : Transaction = new Transaction(this.user.name, this.selectedStock, this.amount, stockPrice.c);
    let buyResult = await this.userService.buy(transaction).toPromise();
  }
}
