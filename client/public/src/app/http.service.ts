import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getUsers() {
    return this._http.get('/users');
  }

  getUser(username) {
    return this._http.get(`/users/${username}`);
  }

  loginUser(user) {
    return this._http.post('/users/login', user);
  }

  createUser(newUser){
    return this._http.post('/users', newUser);
  }

  getStockBySymbol(ticker) {
    return this._http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=Z33FIUU3K8QXGKSD`);
  }
}
