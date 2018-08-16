import { Component, OnInit } from '@angular/core'; 
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stocks = {
    "DJIA": {
    },
    ".IXIC": {
    },
    ".INX": {
    }
  };
  price;
  change;
  percentChange;
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getStockBySymbol("DJIA");
    this.getStockBySymbol(".IXIC");
    this.getStockBySymbol(".INX");
  }

  getStockBySymbol(ticker) {
    let observable = this._httpService.getStockBySymbol(ticker);
    observable.subscribe(data => {
      var date = data["Meta Data"]["3. Last Refreshed"];
      this.stocks[ticker]["price"] = parseFloat(data["Time Series (Daily)"][date]["5. adjusted close"]).toFixed(2);
      var open = parseFloat(data["Time Series (Daily)"][date]["1. open"]);
      this.stocks[ticker]["change"] = (this.stocks[ticker]["price"] - open).toFixed(2);
      this.stocks[ticker]["percent"] = (100*(this.stocks[ticker]["change"])/open).toFixed(2);
    });
  }
}
