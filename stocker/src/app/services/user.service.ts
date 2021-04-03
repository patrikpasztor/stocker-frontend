import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';

const httpGetOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  })
};

const httpPostOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly backendUrl = "http://localhost:9090/api"
  static readonly listStocksEndpoint = "/listStocks/"
  static readonly buyEndpoint = "/buy"
  static readonly sellEndpoint = "/sell"
  static readonly averageBuyPriceEndpoint = "/averageBuyPrice/"

  testUser: User = {
    name : 'paspat',
    balance: 12000,
    unusedBalance: 3000,
    ownedStocks : [{symbol: 'A', buyingPrice: 10, currentPrice: 11, count: 1.5}, {symbol: 'MSFT', buyingPrice: 20, currentPrice: 15, count:10},{symbol: 'AAPL', buyingPrice: 100, currentPrice: 111, count: 5},],
    watchlistedStocks: [{symbol: 'ACCD', buyingPrice: 10, currentPrice: 11, count: 0}, {symbol: 'MSFT', buyingPrice: 20, currentPrice: 15, count: 0},{symbol: 'ADMP', buyingPrice: 100, currentPrice: 111, count: 0},]
  }

  constructor(private http: HttpClient) { }

  getLoggedInUser() : User{
    return this.testUser;
  }

  async getOwnedStocks(user: string) {
    return await this.http.get<Stock[]>(UserService.backendUrl + UserService.listStocksEndpoint + user, httpGetOptions).toPromise();
  }

  buy(transaction: Transaction) {
    return this.http.post(UserService.backendUrl + UserService.buyEndpoint, transaction, httpPostOptions);
  }

  sell(transaction: Transaction) {
    return this.http.post(UserService.backendUrl + UserService.sellEndpoint, transaction, httpPostOptions);
  }

  async getAverageStockBuyPrice(user: string, stock: string) {
    return await this.http.get<number>(UserService.backendUrl + UserService.averageBuyPriceEndpoint + user + '/' + stock, httpGetOptions).toPromise();
  }

}
