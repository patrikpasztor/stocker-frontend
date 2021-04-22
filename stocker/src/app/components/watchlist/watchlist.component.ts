import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Candle } from 'src/app/models/candle';
import { IStockSymbol } from 'src/app/models/stocksymbol';
import { WatchDTO } from 'src/app/models/watchDTO';
import { WatchlistStock } from 'src/app/models/watchlistStock';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from '../../services/user.service';
import { ModalWatchComponent } from '../modals/modal-watch/modal-watch.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  watchedStocks: string[];
  displayStocks: WatchlistStock[] = [];
  loadCompleted = false;
  availableStocks: IStockSymbol[] = [];


  constructor(private userService: UserService, private stockService: StockService, private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.spinner.show();
    this.availableStocks = history.state.data;
    if(this.availableStocks !== undefined)
      this.availableStocks.sort(function(a,b) {return (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0);} );
    await this.updateTable().then(r => {
      this.loadCompleted = true;
      this.spinner.hide();
    })
  }

  async updateTable() {
    this.watchedStocks = await this.userService.getWatchlistedStocks(this.userService.getLoggedInUsername());
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
    this.displayStocks = [];
    this.watchedStocks.forEach(s => {
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

  openAddModal() {
    const modalRef = this.modalService.open(ModalWatchComponent);
    modalRef.componentInstance.stocks = this.availableStocks;
    modalRef.result.then(async result => {
      if(result === 'added') {
        this.spinner.show();
        await this.updateTable().then(r => {
          this.loadCompleted = true;
          this.spinner.hide();
        })
      }
    })
  }

  async remove(stock: string) {
    let watchDTO = new WatchDTO(this.userService.getLoggedInUsername(), stock);
    await this.userService.stopWatch(watchDTO).toPromise();
    this.spinner.show();
    await this.updateTable().then(r => {
      this.loadCompleted = true;
      this.spinner.hide();
    })
  }
}
