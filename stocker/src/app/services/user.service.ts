import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testUser: User = {
    name : 'paspat',
    balance: 12000,
    ownedStocks : [{symbol: 'A', buyingPrice: 10, currentPrice: 11, count: 1.5}, {symbol: 'MSFT', buyingPrice: 20, currentPrice: 15, count:10},{symbol: 'AAPL', buyingPrice: 100, currentPrice: 111, count: 5},],
    watchlistedStocks: [{symbol: 'ACCD', buyingPrice: 10, currentPrice: 11, count: 0}, {symbol: 'MSFT', buyingPrice: 20, currentPrice: 15, count: 0},{symbol: 'ADMP', buyingPrice: 100, currentPrice: 111, count: 0},]
  }

  getLoggedInUser() : User{
    return this.testUser;
  }

  constructor() { }
}
