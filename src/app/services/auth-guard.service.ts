import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn().subscribe()) {
  //     this.router.navigate([ 'login' ]).then();
  //
  //     return false;
  //   }
  //
  //   return true;
  // }

  canActivate(): boolean {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate([ 'login' ]).then();

      return false;
    }

    return true;
  }
}
