import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  static readonly apiKey : string = 'bu4u4kf48v6sjdfq4b2g';

  constructor(private http: HttpClient) { }

  
}
