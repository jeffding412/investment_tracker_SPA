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

  getUserByID(id) {
    return this._http.get(`/user/${id}`);
  }

  loginUser(user) {
    return this._http.post('/users/login', user);
  }

  createUser(newUser){
    return this._http.post('/users', newUser);
  }

  updateUser(id, user){
    return this._http.put(`/users/${id}`, user);
  }

  buyStock(id, order) {
    return this._http.put(`/users/${id}/buy`, order);
  }

  getStockBySymbol(ticker) {
    return this._http.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=Z33FIUU3K8QXGKSD`);
  }

  getStock(ticker) {
    return this._http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=Z33FIUU3K8QXGKSD`);
  }
}
