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
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.router.navigate(['/']);
  }
}
