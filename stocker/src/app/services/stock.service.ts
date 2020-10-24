import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IStockSymbol } from '../models/stocksymbol';
import { IStockQuote } from '../models/stockQuote';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  static readonly apiKey : string = '&token=bu4u4kf48v6sjdfq4b2g';
  static readonly baseUrl : string = 'https://finnhub.io/api/v1';
  static readonly listEndpoint : string = '/stock/symbol?exchange=US';
  static readonly quoteEndpoint: string = '/quote/symbol='

  constructor(private http: HttpClient) { }

  listStocks(): Observable<IStockSymbol[]>{
    return this.http.get<IStockSymbol[]>(StockService.baseUrl + StockService.listEndpoint + StockService.apiKey);
  }

  getStockInfo(symbol: string): Observable<IStockQuote[]>{
    return this.http.get<IStockQuote[]>(StockService.baseUrl + StockService.quoteEndpoint + symbol + StockService.apiKey);
  }
  
}
