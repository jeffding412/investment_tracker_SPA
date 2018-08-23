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

  getUser() {
    let observable = this._httpService.getUserByID(this.id);
    observable.subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }
}
