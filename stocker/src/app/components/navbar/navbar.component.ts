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

  async testStock() {
    // let asyncResult1 : IStockQuote = await this.stockService.getStockPrice("TSLA").toPromise();
    // //let asyncResult2 = await this.stockService.getStocks().toPromise();
    // let asyncResult3 = await this.userService.getOwnedStocks("paspat").toPromise();
    // let buyTran = new Transaction("paspat","NNIO",30.5);
    // let sellTran = new Transaction("paspat","AMZN",0.5);
    // let sellresult = await this.userService.sell(sellTran).toPromise();
    // let buyresult = await this.userService.buy(buyTran).toPromise();
    // //let currentPriceTest = this.stockService.getCurrentPrice("AAPL");
    // console.log("Tesla price: "+asyncResult1.c);
    // //console.log(asyncResult2);
    // console.log(asyncResult3);
    // console.log("sikeres eladás?: " + sellresult);
    // console.log("sikeres vétel?: " + buyresult);
    // console.log("Current tsla aapl test: " + asyncResult1.c);
  }

}
