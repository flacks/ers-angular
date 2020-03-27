import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { Login } from '../models/login';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  private login: Login = new Login();

  reactiveForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn()
      .pipe(
        map((isloggedIn: boolean) => {
          if (isloggedIn) {
            this.router.navigate([ 'reimbursements/view' ]).then();
          }
        })
      ).subscribe();
  }

  ngOnInit(): void { }

  onSubmit() {
    this.login.username = this.reactiveForm.controls.username.value;
    this.login.password = this.reactiveForm.controls.password.value;

    this.authService.login(this.login);
  }
}
