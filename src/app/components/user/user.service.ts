import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(name: string, email: string, password: string) {
    const userData: UserData = { name, email, password };
    this.httpClient.post(BACKEND_URL + '/signup', userData).subscribe(response => {
      console.log(response);
    });
  }
}
