import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  id;
  user = {

  }
  money;
  return;
  investments;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.getUser();
    });
  }

  getStock(ticker, shares, index) {
    let observable = this._httpService.getStockBySymbol(ticker);
    observable.subscribe(data => {
      console.log(this.investments);
      console.log(index);
      this.investments[index]["value"] = ((data["Global Quote"]["05. price"])*shares).toFixed(2);
      this.investments[index]["price"] = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
      this.investments[index]["return"] = (100*(this.investments[index]["value"]-this.investments[index]["principal"])/this.investments[index]["principal"]).toFixed(2);
      this.user["portfolioValue"] += (data["Global Quote"]["05. price"]) * shares;
      this.money = (this.user["portfolioValue"]).toFixed(2);
      this.return = (((this.user["portfolioValue"]-this.user["principleValue"])/this.user["principleValue"])*100).toFixed(2);
    })
  }

  calculateUserStats() {
    var principal = 0;
    for(var i = 0; i < this.user["investments"].length; i++) {
      this.getStock(this.user["investments"][i]["symbol"], this.user["investments"][i]["shares"], i);
      principal += parseFloat(this.user["investments"][i]["principal"]);
    }
    this.user["principleValue"] = principal;
    console.log(this.user);
  }

  getUser() {
    let observable = this._httpService.getUserByID(this.id);
    observable.subscribe(data => {
      this.user = data;
      this.investments = this.user["investments"];
      console.log(this.investments);
      this.calculateUserStats();
    });
  }
}
