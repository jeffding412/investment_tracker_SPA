import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { StockComponent } from './stock/stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'main',component: MainComponent },
  { path: 'signin',component: SigninComponent },
  { path: 'portfolio/:id',component: PortfolioComponent },
  { path: 'settings/:id',component: SettingsComponent },
  { path: 'stock/:id/:ticker',component: StockComponent },
  { path: '', pathMatch: 'full', redirectTo: '/main'},
  { path: '**', redirectTo: '/main' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }