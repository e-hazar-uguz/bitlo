import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiConfig } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  constructor(private http: HttpClient) {}

  // loginUser:any;
  // setLoginUser(user:any){
  //   this.loginUser=user;
  // }
  
  options = {
    url:apiConfig.baseURL,
    options:apiConfig.options
  };

  getAllMarkets() {
    return this.http
      .get<any>(
        this.options.url+'markets'
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
