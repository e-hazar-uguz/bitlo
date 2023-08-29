import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiConfig } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  // loginUser:any;
  // setLoginUser(user:any){
  //   this.loginUser=user;
  // }
  
  options = {
    url:apiConfig.baseAuthURL,
    options:apiConfig.options
  };

  login(identifier:any,password:any) {
    return this.http
      .post<any>(
        this.options.url+'login',
        {
          identifier:identifier,
          password: password
        },
        this.options.options
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
