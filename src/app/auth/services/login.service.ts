import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/auth/models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class LoginService {

  private _isLoggedIn: BehaviorSubject<boolean>;

  private userSubject: BehaviorSubject<User>;

  public user$: Observable<User>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<User>({} as User);
    this.user$ = this.userSubject.asObservable();
    this._isLoggedIn = new BehaviorSubject<boolean>(false);
  }

  login(user: User): void {
    console.log('loginForm: ' + user.email);
    this.userSubject.next(user);
    this._isLoggedIn.next(true);
    void this.router.navigate(['/main']);
  }

  logout(): void {
    this.userSubject.next({} as User);
    this._isLoggedIn.next(false);
    void this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  signup() {
    void this.router.navigate(['/signup']);
  }
}
