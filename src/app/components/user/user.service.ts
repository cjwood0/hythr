import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;

  createUser(name: string, email: string, password: string) {
    const userData: UserData = { name, email, password };
    this.httpClient.post(BACKEND_URL + '/signup', userData).subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const name = '';
    const userData: UserData = { name, email, password };
    this.httpClient.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + '/login', userData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const now = new Date();
        const expiresInDuration = response.expiresIn;
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        this.setUserData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.cleartUserData();
    this.router.navigate(['/']);
  }

  private setUserData(token: string, expirationDate: Date, userId: string ) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expiration),
      userId
    };
  }

  private cleartUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }
}
