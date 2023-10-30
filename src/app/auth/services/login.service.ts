import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {
  login(credentials: string) {
    localStorage.setItem('authToken', credentials);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
  }
}
