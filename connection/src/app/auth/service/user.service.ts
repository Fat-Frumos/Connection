import {inject, Injectable} from '@angular/core';
import {first, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '@app/model/user.model';
import {AuthResponse} from '@app/model/auth-response.model';
import {ProfileResponse} from '@app/model/profile-response.model';
import {selectUser} from '@app/ngrx/user/user.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@app/ngrx/app/app.state';
import {baseUrl} from '@app/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient);

  store: Store<AppState> = inject<Store<AppState>>(Store);

  fetchUser(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(baseUrl + '/profile');
  }

  registration(user: User) {
    return this.http.post<AuthResponse>(baseUrl + '/registration', user).pipe(
      tap(response =>
        this.handleResponse(response, user)));
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(baseUrl + '/login', user).pipe(
      tap((response: AuthResponse): void => {
        this.handleResponse(response, user);
      })
    );
  }

  getUser$(): Observable<User> {
    const userString = localStorage.getItem('user');
    console.log(userString);
    return userString ? of(JSON.parse(userString) as User) : of({} as User);
  }

  handleResponse(response: AuthResponse, user: User): void {
    localStorage.setItem('email', user.email);
    localStorage.setItem('uid', response.uid);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  isAuthenticated(): boolean {
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return !!(token && uid && email);
  }

  getCurrentUser(): User {
    let currentUser: User = {} as User;
    this.store.select(selectUser).pipe(first()).subscribe((user) => {
      currentUser = user ?? ({} as User);
    });
    return currentUser;
  }

  update(name: string) {
    const url = `/profile`;
    return this.http.put<ProfileResponse>(url, {name});
  }
}
