import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ReimbursementViewComponent, ReimbursementReceiptModalComponent } from './reimbursements/view/view.component';
import { ReimbursementCreateComponent } from './reimbursements/create/create.component';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    ReimbursementViewComponent,
    ReimbursementReceiptModalComponent,
    ReimbursementCreateComponent,

    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
