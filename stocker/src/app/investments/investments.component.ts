import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
  }

  getStockValue(count: number, price: number) : string {
    let value = count * price;
    return value.toString();
  }

  getProfitInPercent(count: number, buyingPrice: number, currentPrice: number) : string {
    let profit = (((count * currentPrice) / (count * buyingPrice)) - 1) * 100;
    return profit < 0 ? profit.toPrecision(2) : '+' + profit.toPrecision(2);
  }

}
