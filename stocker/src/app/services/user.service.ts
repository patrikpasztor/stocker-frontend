import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoneyTransferDTO } from '../models/moneyTransferDTO';
import { Stock } from '../models/stock';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { UserDTO } from '../models/userDTO';
import { WatchDTO } from '../models/watchDTO';

// const httpGetOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'Basic ' + btoa('admin:admin')
//   })
// };

const httpPostOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type':  'application/json',
  //   'Authorization': 'Basic ' + btoa('admin:admin')
  // }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly backendUrl = "http://localhost:9090/api";
  static readonly listStocksEndpoint = "/listStocks/";
  static readonly buyEndpoint = "/buy";
  static readonly sellEndpoint = "/sell";
  static readonly averageBuyPriceEndpoint = "/averageBuyPrice/";
  static readonly registerEndpoint = "/sign-up";
  static readonly getBalanceEndpoint = "/balance/";
  static readonly moneyTransferEndpoint = "/charge-balance";
  static readonly getWatchlistEndpoint = "/watchlist/";
  static readonly getWatchEndpoint = "/watch";
  static readonly getStopWatchEndpoint = "/stop-watch";

  constructor(private http: HttpClient) { }

  getLoggedInUsername() : string{
    return sessionStorage.getItem('username');;
  }

  async getOwnedStocks(user: string) {
    return await this.http.get<Stock[]>(UserService.backendUrl + UserService.listStocksEndpoint + user).toPromise();
  }

  async getWatchlistedStocks(user: string) {
    return await this.http.get<string[]>(UserService.backendUrl + UserService.getWatchlistEndpoint + user).toPromise();
  }

  buy(transaction: Transaction) {
    return this.http.post(UserService.backendUrl + UserService.buyEndpoint, transaction, httpPostOptions);
  }

  sell(transaction: Transaction) {
    return this.http.post(UserService.backendUrl + UserService.sellEndpoint, transaction, httpPostOptions);
  }

  async getAverageStockBuyPrice(user: string, stock: string) {
    return await this.http.get<number>(UserService.backendUrl + UserService.averageBuyPriceEndpoint + user + '/' + stock).toPromise();
  }

  register(userDTO: UserDTO) {
    return this.http.post(UserService.backendUrl + UserService.registerEndpoint, userDTO, httpPostOptions);
  }

  async getBalance(user: string) {
    return await this.http.get<number>(UserService.backendUrl + UserService.getBalanceEndpoint + user).toPromise();
  }

  moneyTransfer(moneyTransfer: MoneyTransferDTO) {
    return this.http.post(UserService.backendUrl + UserService.moneyTransferEndpoint, moneyTransfer, httpPostOptions);
  }

  watch(watchDTO: WatchDTO) {
    return this.http.post(UserService.backendUrl + UserService.getWatchEndpoint, watchDTO, httpPostOptions);
  }

  stopWatch(watchDTO: WatchDTO) {
    return this.http.post(UserService.backendUrl + UserService.getStopWatchEndpoint, watchDTO, httpPostOptions);
  }
}
