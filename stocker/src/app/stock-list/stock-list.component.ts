import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  
  public stocks = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.listStocks()
      .subscribe(data => this.stocks = data);
    console.log(this.stocks)
  }
}
