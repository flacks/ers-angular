import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { ReimbursementViewComponent } from './reimbursements/view/view.component';
import { ReimbursementCreateComponent } from './reimbursements/create/create.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'reimbursements/view',
    component: ReimbursementViewComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reimbursements/create',
    component: ReimbursementCreateComponent,
    canActivate: [ AuthGuardService ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
