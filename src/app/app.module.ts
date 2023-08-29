import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { MarketsComponent } from './components/markets/markets.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BalancesComponent } from './components/balances/balances.component';
import { OpenOrdersComponent } from './components/open-orders/open-orders.component';
import { HeaderComponent } from './shared/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { PhoneNumberFormatPipe } from './components/profile/phone-number-format.pipe';
import { AccessMessageComponent } from './shared/access-message/access-message.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainPageComponent,
    LoginComponent,
    MarketsComponent,
    ProfileComponent,
    BalancesComponent,
    OpenOrdersComponent,
    PhoneNumberFormatPipe,
    AccessMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
