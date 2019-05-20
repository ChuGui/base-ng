import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UserToken } from '../_models/userToken';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject$: BehaviorSubject<UserToken>;
  public currentUser$: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject$.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authentication_token`, {username, password})
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token) {
          // store user details an jwt token in local storage to keep user logged in between page refreshes
          const userDetails: any = jwt_decode(data.token);
          const user: UserToken = {
            username: userDetails.username,
            iat: userDetails.iat,
            exp: userDetails.exp,
            roles: userDetails.roles,
            token: data.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject$.next(user);
        }
        return data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
  }

}
