import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecTrends } from 'src/app/models/recTrends';
import { IStockQuote } from 'src/app/models/stockQuote';
import { IStockSymbol } from 'src/app/models/stocksymbol';
import { Transaction } from 'src/app/models/transaction';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';
import { ModalAddMoneyComponent } from '../modals/modal-add-money/modal-add-money.component';
import { ModalTakeOutMoneyComponent } from '../modals/modal-take-out-money/modal-take-out-money.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  stocks: IStockSymbol[] = [];
  selectedStock: string = 'TSLA';
  stockPrice: IStockQuote;
  amount: number = 0;
  sum: number = 0;
  recTrends: RecTrends[];
  availableMoney: number = 0;

  constructor(private userService: UserService, private stockService: StockService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.stocks = history.state.data;
    if(this.stocks !== undefined)
      this.stocks.sort(function(a,b) {return (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0);} );
    this.updateStockPrice();
    this.updateRecTrends();
    this.updateAvailableMoney();
  }

  async updateStockPrice() {
    this.stockPrice = await this.stockService.getStockPrice(this.selectedStock);
  }

  calcSum() {
    this.sum = this.stockPrice.c * this.amount;
  }

  async stockChanged() {
    await this.updateStockPrice();
    await this.updateRecTrends();
    this.calcSum();
  }

  async buy() {
    console.log("megvesszük: " + this.selectedStock)
    let stockPrice = await this.stockService.getStockPrice(this.selectedStock);
    let transaction : Transaction = new Transaction(this.userService.getLoggedInUsername(), this.selectedStock, this.amount, stockPrice.c);
    await this.userService.buy(transaction).toPromise();
    this.updateAvailableMoney();
  }

  async updateRecTrends() {
    this.recTrends = await this.stockService.getRecTrends(this.selectedStock);
  }

  async updateAvailableMoney() {
    let userEmail = this.userService.getLoggedInUsername();
    this.availableMoney = await this.userService.getBalance(userEmail);
  }

  enoughMoney(): boolean {
    return this.availableMoney >= this.sum;
  }

  amountMoreThanZero(): boolean {
    return this.amount > 0;
  }

  canBuy(): boolean {
    return this.enoughMoney() && this.amountMoreThanZero();
  }

  openAddMoney() {
    const modalRef = this.modalService.open(ModalAddMoneyComponent);
    modalRef.componentInstance.user = this.userService.getLoggedInUsername();
    modalRef.result.then(result => {
      if(result === 'transferred')
      this.updateAvailableMoney();
    })
  }

  openTakeOutMoney() {
    const modalRef = this.modalService.open(ModalTakeOutMoneyComponent);
    modalRef.componentInstance.user = this.userService.getLoggedInUsername();
    modalRef.result.then(result => {
      if(result === 'transferred')
      this.updateAvailableMoney();
    })
  }
}
