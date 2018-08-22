import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  id;
  ticker;
  stock = {

  }
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params["id"]
      this.ticker = params['ticker'];
      this.getStock(this.ticker);
    }); 
  }

  getStock(ticker) {
    let observable = this._httpService.getStockBySymbol(ticker);
    observable.subscribe(data => {
      this.stock["name"] = data["Global Quote"]["01. symbol"];
      this.stock["price"] = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
      this.stock["change"] = parseFloat(data["Global Quote"]["09. change"]).toFixed(2);
      this.stock["percent"] = parseFloat(data["Global Quote"]["10. change percent"]).toFixed(2);
    });
  }
}
