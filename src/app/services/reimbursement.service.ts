import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Reimbursement } from '../models/reimbursement';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  private readonly userId: number;

  createReimbursement(reimbursement: Reimbursement) {
    return this.http.post('http://localhost:8080/ERS/reimbursements', reimbursement);
  }

  getReimbursements(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>('http://localhost:8080/ERS/reimbursements');
  }

  getReimbursementsByUserId(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>('http://localhost:8080/ERS/reimbursements/' + this.userId);
  }

  updateReimbursement(reimbursement: Reimbursement) {
    this.http.put('http://localhost:8080/ERS/reimbursements', reimbursement).subscribe();
  }
}
