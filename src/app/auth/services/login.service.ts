import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/auth/models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class LoginService {

  private userSubject: BehaviorSubject<User | null>;

  user$: Observable<User | null>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user$ = this.userSubject.asObservable();
    console.log(localStorage.getItem('user'));
  }

  login(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem('user'));
    this.userSubject.next(user);
    alert('Login successful!' + JSON.stringify(user));
    void this.router.navigate(['/main']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    void this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
