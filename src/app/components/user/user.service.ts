import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private token: string;
  private tokenTimer: any;
  private userStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserStatusListener() {
    return this.userStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  createUser(name: string, email: string, password: string) {
    const userData: UserData = { name, email, password };
    this.httpClient.post(BACKEND_URL + '/signup', userData).subscribe(response => {
      this.router.navigate(['/']);
    }, error => {
      this.userStatusListener.next(false);
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
        this.userStatusListener.next(true);
        this.setUserData(token, expirationDate, this.userId);
        //this.setAuthTimer(expiresInDuration);
        this.router.navigate(['/']);
      }
    }, error => {
      this.userStatusListener.next(false);
    });
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const userInformation = this.getUserData();
    if (!userInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = userInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = userInformation.token;
      this.isAuthenticated = true;
      this.userId = userInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.userStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.userStatusListener.next(false);
    this.cleartUserData();
    //clearTimeout(this.tokenTimer);
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
