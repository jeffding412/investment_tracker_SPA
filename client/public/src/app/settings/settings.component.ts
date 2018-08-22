import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  id;
  user = {
    "username": ""
  }
  change = {
    "password": "",
    "confirm": ""
  }
  errors = {}

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getUser();
    }); 
  }

  validateUsername() {
    this.errors = {
      "status": "false"
    };
    if (this.user.username.replace(/\s/g, '').length < 3) {
      this.errors["username"] = "Username is required and must be at least 3 characters";
      this.errors["status"] = "true";
      return false;
    }
    let observable = this._httpService.getUser(this.user.username);
    observable.subscribe(data => {
      if (data) {
        this.errors["username"] = "Username already exists";
        this.errors["status"] = "true";
      }
      else {
        let observable = this._httpService.updateUser(this.id, this.user);
        observable.subscribe(data => {
          console.log(data);
        })
      }
    });
  }

  changeUsername() {
    this.validateUsername();
  }

  changePassword() {
    this.errors = {
      "status": "false"
    };
    if (this.change.password.replace(/\s/g, '').length < 3) {
      this.errors["password"] = "Password is required and must be at least 3 characters";
      this.errors["status"] = "true";
      return false;
    }
    else if (this.change.password != this.change.confirm) {
      this.errors["confirm"] = "Password's are not the same'";
      this.errors["status"] = "true";
      return false;
    }
    let observable = this._httpService.updateUser(this.id, this.change);
    observable.subscribe(data => {
      console.log(data);
    })
  }
 
  getUser() {
    let observable = this._httpService.getUserByID(this.id);
    observable.subscribe(data => {
      this.user["username"] = data["username"];
    });
  }
}
