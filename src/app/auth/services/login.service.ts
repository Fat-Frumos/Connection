import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/auth/models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {StorageService} from '@app/youtube/services/storage.service';

@Injectable()
export class LoginService {

  private _isLoggedIn: BehaviorSubject<boolean>;

  public isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: StorageService) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isAuth$ = this._isLoggedIn.asObservable();
  }

  get user(): User {
    return this.store.getUser();
  }

  login(user: User): void {
    this._isLoggedIn.next(true);
    this.store.login(user);
    console.log(this._isLoggedIn.getValue());
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this.store.logout();
    void this.router.navigate(['/login']);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  signup(): void {
    void this.router.navigate(['/signup']);
  }
}
