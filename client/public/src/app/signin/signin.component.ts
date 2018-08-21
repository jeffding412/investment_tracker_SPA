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
  }

  user = {
    "username": "",
    "password": "",
  }

  errors = {}

  constructor(private _httpService: HttpService){}

  ngOnInit() {
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

  register() {
    if (this.validateRegistration()) {
      console.log("gucci");
    }
  }

  login() {
    console.log(this.user);
  }

}
