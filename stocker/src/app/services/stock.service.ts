import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IStockSymbol } from '../models/stocksymbol';
import { IStockQuote } from '../models/stockQuote';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  static readonly apiKey : string = '&token=c1d6od748v6p6472072g';
  static readonly baseUrl : string = 'https://finnhub.io/api/v1';
  static readonly listEndpoint : string = '/stock/symbol?exchange=US&securityType=Common Stock&mic=XNAS';
  static readonly quoteEndpoint: string = '/quote?symbol='

  constructor(private http: HttpClient) { }

  getStocks(): Observable<IStockSymbol[]>{
    return this.http.get<IStockSymbol[]>(StockService.baseUrl + StockService.listEndpoint + StockService.apiKey);
  }

  async getStockPrice(symbol: string) {
    return await this.http.get<IStockQuote>(StockService.baseUrl + StockService.quoteEndpoint + symbol + StockService.apiKey).toPromise();
  }
}
