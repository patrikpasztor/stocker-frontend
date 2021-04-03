import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSellComponent } from '../modal-sell/modal-sell.component';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

  user: User;
  stocks: Stock[];
  loadCompleted: boolean = false;

  constructor(private userService: UserService, private stockService: StockService, private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.spinner.show();
    this.user = this.userService.getLoggedInUser();
    await this.updateStockTable().then(v => {
      this.spinner.hide();
      this.loadCompleted = true;
    });
    console.log(this.stocks);
    console.log(this.stocks);
  }

  async updateStockTable() {
    this.stocks = await this.userService.getOwnedStocks(this.user.name);
    await this.updateStockPrice();
    await this.updateStockProfit();
  }

  async getOwnedStocks() {
    this.stocks = await this.userService.getOwnedStocks(this.user.name);
  }

  getStockValue(count: number, price: number) : string {
    let value = count * price;
    return value.toPrecision(4);
  }

  getProfitInPercent(profit: number) : string {
    return profit < 0 ? profit.toPrecision(2) : '+' + profit.toPrecision(2);
  }

  async updateStockPrice() {
    for(let s of this.stocks) {
      let stockPrice = await this.stockService.getStockPrice(s.symbol);
      s.price = stockPrice.c;
    }
  }

  async updateStockProfit() {
    for(let s of this.stocks) {
      let averageBuyPrice = await this.userService.getAverageStockBuyPrice(this.user.name, s.symbol);
      s.profit = (((s.amount * s.price) / (s.amount * averageBuyPrice)) - 1) * 100;
    }
  }

  open(name: string, amount: number, price: number) {
    const modalRef = this.modalService.open(ModalSellComponent);
    modalRef.componentInstance.stockName = name;
    modalRef.componentInstance.userName = this.user.name;
    modalRef.componentInstance.ownedAmount = amount;
    modalRef.componentInstance.price = price;
    modalRef.result.then(async (result) => {
      this.loadCompleted = false;
      this.spinner.show();
      await this.updateStockTable().then(v => {
        this.spinner.hide();
        this.loadCompleted = true;
      });
    })
  }
}
