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
  shares = 0;
  buy = true;
  errors = {

  }
  investment = {
    
  }
  user;
  info;
  owns = false;
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

  getUser() {
    let observable = this._httpService.getUserByID(this.id);
    observable.subscribe(data => {
      for (var i = 0; i < data["investments"].length; i++) {
        if (data["investments"][i]["symbol"] == this.ticker) {
          this.user = data["investments"][i];
          this.user["equity"] = (this.user['shares']*this.stock['price']).toFixed(2);
          console.log(this.user["equity"]);
          this.user["return"] = ((this.user["shares"]*this.stock["price"]) - parseFloat(this.user['principal'])).toFixed(2);
          this.user["returnPercent"] = ((parseFloat(this.user["return"])/parseFloat(this.user["principal"]))*100).toFixed(2);
          this.user["averageCost"] = (parseFloat(this.user['principal']) / this.user['shares']).toFixed(2);
          this.owns = true;
        }
      }
    });
  }

  getStock(ticker) {
    let observable = this._httpService.getStockBySymbol(ticker);
    observable.subscribe(data => {
      this.info = data;
      this.stock["name"] = data["Global Quote"]["01. symbol"];
      this.stock["price"] = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
      this.stock["change"] = parseFloat(data["Global Quote"]["09. change"]).toFixed(2);
      this.stock["percent"] = parseFloat(data["Global Quote"]["10. change percent"]).toFixed(2);
      this.getUser();
      console.log(this.info)
    });
  }

  continue() {
    this._router.navigate(['/portfolio', this.id]);
  }

  marketBuy() {
    this.buy = true;
  }

  marketSell() {
    this.buy = false;
  }

  order() {
    this.errors = {}
    if (!(Number.isInteger(this.shares) && this.shares > 0)) {
      this.errors["shares"] = "Shares must be a positive integer";
    }
    else {
      if (this.buy) {
        let observable = this._httpService.getStockBySymbol(this.ticker);
        observable.subscribe(data => {
          this.investment["symbol"] = this.ticker;
          this.investment["shares"] = this.shares;
          this.investment["principal"] = (parseFloat(data["Global Quote"]["05. price"]) * this.shares).toFixed(2);
          let observable = this._httpService.buyStock(this.id, this.investment);
          observable.subscribe(data => {
            this.continue();
          })
        });
      }
      else {
        if (this.shares > this.user['shares']) {
          this.errors["shares"] = "You don't own enough shares";
          return false;
        }
        let observable = this._httpService.getStockBySymbol(this.ticker);
        observable.subscribe(data => {
          console.log(data);
          this.investment["symbol"] = this.ticker;
          this.investment["shares"] = this.shares;
          let observable = this._httpService.sellStock(this.id, this.investment);
          observable.subscribe(data => {
            this.continue();
          })
        });
      }
    }
  }
}
