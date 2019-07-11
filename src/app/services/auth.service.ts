import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private user: IUser;

  constructor() {
    this.token = window.localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logIn(username: string, password: string): Promise<boolean> {
    this.token = "dummy";
    this.user = { username };
    window.localStorage.setItem('userToken', this.token);
    return Promise.resolve(true);
  }

  getCurrentUser(): IUser {
    return this.user;
  }

  logOut() {
    this.token = null;
    this.user = null;
    window.localStorage.removeItem('userToken');
  }
}
