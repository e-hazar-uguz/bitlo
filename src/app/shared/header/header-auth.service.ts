import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderAuthService {

  constructor() { }

  private isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
