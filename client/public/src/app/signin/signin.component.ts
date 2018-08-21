import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  newUser = {
    "username": "",
    "password": "",
    "portfolioValue": 0,
    "principleValue": 0
  }

  user = {
    "username": "",
    "password": "",
  }

  errors = {}

  constructor(private _httpService: HttpService){}

  ngOnInit() {
  }

  getUserByUsername(username) {
    let observable = this._httpService.getUser(username);
    observable.subscribe(data => {
      if (data) {
        this.errors["username"] = "Username already exists";
        this.errors["status"] = "true";
      }
      else {
        let observable = this._httpService.createUser(this.newUser);
        observable.subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  // validate forms
  validateRegistration() {
    this.errors = {
      "status": "false"
    };
    if (this.newUser.username.replace(/\s/g, '').length < 3) {
      this.errors["username"] = "Username is required and must be at least 3 characters";
      this.errors["status"] = "true";
    }
    if (this.newUser.password.replace(/\s/g, '').length < 3) {
      this.errors["password"] = "Password is required and must be at least 3 characters";
      this.errors["status"] = "true";
    }

    if (this.errors["status"] == "true") {
      return false;
    }
    else {
      return true;
    }
  }

  validateLogin() {
    this.errors = {
      "status": "false"
    };
    let observable = this._httpService.getUser(this.user.username);
    observable.subscribe(data => {
      if (!data) {
        this.errors["login"] = "Invalid Credentials";
        this.errors["status"] = "true";
      }
      else {
        console.log()
      }
    });
  }

  register() {
    if (this.validateRegistration()) {
      this.getUserByUsername(this.newUser.username)
    }
  }

  login() {
    this.validateLogin()
  }
}
