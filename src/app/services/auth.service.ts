import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import environment from '../../environments/environment';
import { Response } from '../dto';

export interface IUser {
  id: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private user: IUser;

  constructor(private httpClient: HttpClient) {
    this.token = window.localStorage.getItem('userToken');
    const serializedUserData = window.localStorage.getItem('userData');

    if (serializedUserData) {
      this.user = JSON.parse(serializedUserData);
    }
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  async register(username: string, password: string): Promise<Response<IUser>> {
    const response = await this.httpClient
      .post<Response<IUser>>(`${environment.backendUrl}/auth/register`, { username, password })
      .toPromise();

    console.log(response);

    this.token = this.encodeToken(username, password);
    this.user = response.data;
    window.localStorage.setItem('userData', JSON.stringify(this.user));
    window.localStorage.setItem('userToken', this.token);

    return response;
  }

  async logIn(username: string, password: string): Promise<IUser> {
    const token = this.encodeToken(username, password);
    const user = await this.httpClient.get<IUser>(`${environment.backendUrl}/auth/check_login`, {
      headers: {
        'Authorization': token
      },
      withCredentials: true
    }).toPromise();

    this.token = token;
    this.user = user;
    window.localStorage.setItem('userData', JSON.stringify(user));
    window.localStorage.setItem('userToken', this.token);
    return user;
  }

  getCurrentUser(): IUser {
    return this.user;
  }

  getToken(): string {
    return this.token;
  }

  logOut() {
    this.token = null;
    this.user = null;
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('userData');
  }

  encodeToken(username: string, password: string) {
    return 'Basic ' + btoa(username + ':' + password);
  }
}
