import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IStock } from '../models/stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  static readonly apiKey : string = 'bu4u4kf48v6sjdfq4b2g';
  static readonly baseUrl : string = 'https://finnhub.io/api/v1';
  static readonly listEndpoint : string = '/stock/symbol?exchange=US';

  constructor(private http: HttpClient) { }

  listStocks(): Observable<IStock[]>{
    return this.http.get<IStock[]>(StockService.baseUrl + StockService.listEndpoint + '&token=' + StockService.apiKey);
  }
  
}
