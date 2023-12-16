import {inject, Injectable} from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthUser} from '@app/model/user/user-registration.model';
import {UserLoginResponse} from '@app/model/user/user-login-response.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {Store} from '@ngrx/store';
import {AppState} from '@app/ngrx/app/app.state';
import {baseUrl} from '@app/config';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {RouterService} from '@app/auth/service/router.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient);

  toast: ToastService = inject(ToastService);

  router: RouterService = inject(RouterService);

  store: Store<AppState> = inject<Store<AppState>>(Store);

  registration(user: AuthUser): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${baseUrl}/registration`, user).pipe(
      tap(response => this.saveTokenToStorage(response)),
      tap(() => this.router.navigate(['/signin']))
    );
  }

  login(user: AuthUser): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${baseUrl}/login`, user).pipe(
      tap((response: UserLoginResponse): void => {
        this.saveTokenToStorage(response);
        this.saveUserToStorage(user);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/logout`).pipe(
      tap(() => {
        this.clearUserData();
        this.router.navigate(['/login']);
      })
    );
  }

  fetchUser(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${baseUrl}/profile`);
  }

  getAuthUser$(): Observable<UserProfileResponse> {
    const userString = localStorage.getItem('user');
    return userString ? of(JSON.parse(userString) as UserProfileResponse) : of({} as UserProfileResponse);
  }

  getCurrentUser(): UserProfileResponse {
    let currentUser = {} as UserProfileResponse;
    this.getAuthUser$().subscribe(user => {
      currentUser = user;
    });
    return currentUser;
  }

  update(name: string): Observable<UserProfileResponse> {
    return this.http.put<UserProfileResponse>(`${baseUrl}/profile`, {name});
  }

  saveTokenToStorage(response: UserLoginResponse): void {
    localStorage.setItem('uid', response.uid);
    localStorage.setItem('token', response.token);
  }

  private saveUserToStorage(user: AuthUser) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return !!(token && uid && email);
  }

  private clearUserData() {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    sessionStorage.clear();
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/,
        `=;expires=${new Date().toUTCString()};path=/`);
    });
  }

  togglePanels(isSignUp: boolean, container: Element) {
    this.router.togglePanels(isSignUp, container);
  }
}
