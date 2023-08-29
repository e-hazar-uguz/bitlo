import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { apiConfig } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  loginUser:any;
  setLoginUser(user:any){
    this.loginUser=user
  }
  
  options = {
    url:apiConfig.baseAuthURL,
    options:apiConfig.options
  };

  getMyProfile() {   
    const headers = {
      'x-bitlo-auth': this.loginUser.token
    };
    
    return this.http
      .post<any>(
        this.options.url + 'me',
        this.options.options,
        { headers: headers }
      )
      .pipe(
        map((res: any) => {
         let response = res['me'];
         return response;
        })
      );
  
  }

}
