import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modelli/users.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIKey = 'AIzaSyAc2XgMPMwyUbf5-3AaXRsIGCMII3XDXZM';
  signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`;
  signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`;
  isLoggedIn = false;
  isAdmin = false;
  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  isRoleAdmin() {
    return this.isAdmin;
  }

  isAuthenticated(): boolean {
    const userData = localStorage.getItem('user');

    if (!userData) {
      this.logout();

      return false;
    }

    const parsedUser = JSON.parse(userData);
    const expirationDate = new Date(parsedUser._tokenExpirationDate);

    if (expirationDate > new Date()) {
      this.user = new User(
        parsedUser.email,
        parsedUser.id,
        parsedUser._token,
        expirationDate
      );
    }else{
      this.logout();

      return false;
    }

    return true;
  }

  createUser(email: string, id: string, token: string, expirationDate: Date) {
    this.user = new User(email, id, token, expirationDate);
  }

  signUp(email: string, password: string) {
    return this.http.post(this.signUpURL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post(this.signInURL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }
}
