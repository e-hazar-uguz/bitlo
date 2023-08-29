import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiConfig } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  constructor(private http: HttpClient) {}

  loginUser:any;
  setLoginUser(user:any){
    this.loginUser=user
  }
  
  options = {
    url:apiConfig.baseAuthURL,
    options:apiConfig.options
  };

  getAllBalances() {   
    const headers = {
      'x-bitlo-auth': this.loginUser.token
    };
    
    return this.http
      .post<any>(
        this.options.url + 'balances',
        this.options.options,
        { headers: headers }
      )
      .pipe(
        map((res: any) => {
         let response = res['balances'];
         return response;
        })
      );
  
  }
}
