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

  getStockValue(count: number, price: number) {
    return count*price;
  }

}
