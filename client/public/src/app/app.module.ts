import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
