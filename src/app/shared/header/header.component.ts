import { Component } from '@angular/core';
import { HeaderAuthService } from './header-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loginUser: any;
  isLogged=false;
  logo='assets/logo.png';

  constructor(public headerAuthService:HeaderAuthService) { }

  ngOnInit(): void {
    if (localStorage.length>0) {
      let infos = JSON.parse(localStorage.getItem('userData') || '');
      this.loginUser = infos.user.code;
      if(this.loginUser===0){
       this.headerAuthService.login();
      }
      else{
        this.headerAuthService.logout();
      }

    }
    else{
      this.headerAuthService.logout();
    }
  }

  logout() {
    this.headerAuthService.logout();
  }

}
