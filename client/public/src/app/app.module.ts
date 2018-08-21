import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
