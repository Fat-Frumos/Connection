import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/auth/models/user';
import {BehaviorSubject, ReplaySubject, skip} from 'rxjs';
import {StorageService} from '@app/youtube/services/storage.service';

@Injectable()
export class LoginService {

  private isUserFetched$: ReplaySubject<void>;

  private _currentUser$: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private store: StorageService) {
    this.isUserFetched$ = new ReplaySubject<void>();
    this._currentUser$ = new BehaviorSubject<User>({} as User);
    this.fetchUser();
  }

  fetchUser() {
    const user = JSON.parse(localStorage.getItem('user') ?? '') as User;
    this.setCurrentUser$(user);
    return this.getCurrentUser$();
  }

  getCurrentUser$() {
    return this._currentUser$.pipe(skip(1));
  }

  setCurrentUser$(user: User): void {
    this.isUserFetched$.next();
    this._currentUser$.next(user);
  }

  login(user: User): void {
    this.store.login(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._currentUser$.next({} as User);
    void this.router.navigate(['/login']);
  }

  signup(): void {
    void this.router.navigate(['/signup']);
  }
}
