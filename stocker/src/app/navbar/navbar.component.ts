import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { StockService } from '../services/stock.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public stocks = [];
  user: User;

  constructor(private stockService: StockService, private userService: UserService) { }

  ngOnInit() {
    this.stockService.listStocks()
      .subscribe(data => this.stocks = data);
    this.user = this.userService.getLoggedInUser();
  }

}
