import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpClient: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  login(login: Login): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'my-auth-token'
      })
    };

    this.httpClient.post<User>('http://localhost:8080/ERS/login', login, httpOptions)
      .pipe(
        map((user: User) => {
          if (user != null) {
            this.user = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isLoginSubject.next(true);
          }
        })
      ).subscribe();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
    this.router.navigate([ 'login' ]).then();
    location.reload();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  isManager(): boolean {
    if (this.hasToken()) {
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      if (user.roleId === 'Manager' || user.roleId === 'Admin') {
        return true;
      }
    }

    return false;
  }

  getUserId(): number {
    return this.hasToken() ? this.user.userId : null;
  }

  getUsername(): string {
    return this.hasToken() ? this.user.username : null;
  }
}
