import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Candle } from 'src/app/models/candle';
import { WatchlistStock } from 'src/app/models/watchlistStock';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  candle: Candle;
  stocks: string[];
  displayStocks: WatchlistStock[] = [];
  loadCompleted = false;

  constructor(private userService: UserService, private stockService: StockService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    await this.updateTable().then(r => {
      this.loadCompleted = true;
      this.spinner.hide();
    })
  }

  async updateTable() {
    this.stocks = await this.userService.getWatchlistedStocks(this.userService.getLoggedInUsername());
    this.fillDisplayStocks();
    await this.updateStockPrices();
  }

  async updateStockPrices() {
    for(let s of this.displayStocks) { 
      let stockPrice = await this.stockService.getStockPrice(s.symbol);
      s.price = stockPrice.c;
      s.todayOpenPrice = stockPrice.o;
      let from : number = ((Date.now() / 1000) - 604800) | 0;
      let to : number = (Date.now() / 1000) | 0;
      let candles = await this.stockService.getCandles(s.symbol, from, to);
      if(candles.s === 'ok') {
        s.weekAgoOpenPrice = candles.o[0];
      }
    }
  }

  fillDisplayStocks() {
    this.stocks.forEach(s => {
      this.displayStocks.push(new WatchlistStock(s));
    })
  }

  getWeeklyMove(stock: WatchlistStock) {
    let move = ((stock.price / stock.weekAgoOpenPrice) - 1) * 100;
    return move < 0 ? move.toFixed(2) : '+' + move.toFixed(2);
  }

  getDailyMove(stock: WatchlistStock) {
    let move = ((stock.price / stock.todayOpenPrice) - 1) * 100;
    return move < 0 ? move.toFixed(2) : '+' + move.toFixed(2);
  }

}
