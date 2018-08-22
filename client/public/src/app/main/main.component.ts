import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  stocks = {
    "DJIA": {
    },
    ".IXIC": {
    },
    ".INX": {
    }
  };
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getStockBySymbol("DJIA");
    this.getStockBySymbol(".IXIC");
    this.getStockBySymbol(".INX");
  }

  getStockBySymbol(ticker) {
    let observable = this._httpService.getStockBySymbol(ticker);
    observable.subscribe(data => {
      console.log(parseFloat(data["Global Quote"]["05. price"]).toFixed(2));
      // var date = data["Meta Data"]["3. Last Refreshed"];
      this.stocks[ticker]["price"] = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
      // var open = parseFloat(data["Time Series (Daily)"][date]["1. open"]);
      this.stocks[ticker]["change"] = parseFloat(data["Global Quote"]["09. change"]).toFixed(2);
      this.stocks[ticker]["percent"] = parseFloat(data["Global Quote"]["10. change percent"]).toFixed(2);
    });
  }
  
}
