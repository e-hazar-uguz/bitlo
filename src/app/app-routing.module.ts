import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MarketsComponent } from './components/markets/markets.component';
import { OpenOrdersComponent } from './components/open-orders/open-orders.component';
import { BalancesComponent } from './components/balances/balances.component';
import { AccessMessageComponent } from './shared/access-message/access-message.component';


const routes: Routes = [
  {path:'', redirectTo:'main-page', pathMatch : 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'profile/open-orders', component: OpenOrdersComponent },
  { path: 'profile/balances', component: BalancesComponent },
  { path: 'access-message', component: AccessMessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
