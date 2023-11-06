import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/auth/models/user';

@Injectable()
export class LoginService {

  constructor(private router: Router) {
    this.logout();
  }

  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem('user'));
    alert('Login successful!' + JSON.stringify(user));
    void this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.removeItem('user');
    void this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
