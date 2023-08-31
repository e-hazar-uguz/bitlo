import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderAuthService {

  constructor(private router: Router) { }

  private isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['login']);
    
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
