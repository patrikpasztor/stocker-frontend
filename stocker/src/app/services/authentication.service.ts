import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDTO } from '../models/authDTO';

// const httpPostOptions = {
//   // headers: new HttpHeaders({
//   //   'Content-Type':  'application/json',
//   //   'Authorization': 'Basic ' + btoa('admin:admin')
//   // }),
//   responseType: 'text' as 'json'
// };

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly backendUrl = "http://localhost:9090/api";
  static readonly authenticationEndpoint = "/auth"

  constructor(private http: HttpClient) { }

  async authenticate(authDTO: AuthDTO) {
    let isAuth = await this.callAuth(authDTO).toPromise();
    if(isAuth) {
      sessionStorage.setItem('username', authDTO.email);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }

  callAuth(authDTO: AuthDTO): Observable<boolean> {
    console.log('to check auth: ' + authDTO.email + ' ' + authDTO.password)
    return this.http.post<boolean>(AuthenticationService.backendUrl + AuthenticationService.authenticationEndpoint, authDTO);
  }
}
