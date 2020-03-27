import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Reimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';

import { Type } from '../../enums/reimbursements/type.enum';
import { Status } from '../../enums/reimbursements/status.enum';

import { ReimbursementService } from '../../services/reimbursement.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-receipt-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Receipt</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body text-center">
      <img class="img-thumbnail" src="{{ receipt }}" alt="Receipt image">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ReimbursementReceiptModalComponent {
  @Input() receipt;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-reimbursement-view',
  templateUrl: './view.component.html',
  styleUrls: [ './view.component.css' ]
})
export class ReimbursementViewComponent implements OnInit {
  reimbursementList: Reimbursement[];
  Type = Type;
  Status = Status;
  isManager: boolean;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));
  setFilter: string;
  reimbursementDisplay: Reimbursement[];

  constructor(
    private authService: AuthService,
    private reimbursementService: ReimbursementService,
    private modalService: NgbModal
  ) {
    this.isManager = authService.isManager();

    if (this.isManager) {
      reimbursementService.getReimbursements().subscribe(reimbursementList => {
        this.reimbursementList = reimbursementList;
        this.doFilter('Pending');
      });
    } else {
      reimbursementService.getReimbursementsByUserId().subscribe(reimbursementList => {
        this.reimbursementList = reimbursementList;
        this.doFilter('Pending');
      });
    }
  }

  ngOnInit(): void { }

  approveReimbursement(reimbursement: Reimbursement) {
    reimbursement.reimbId = reimbursement.reimbId;
    reimbursement.resolver = this.user;
    reimbursement.statusId = 2;

    this.reimbursementService.updateReimbursement(reimbursement);
  }

  denyReimbursement(reimbursement: Reimbursement) {
    reimbursement.reimbId = reimbursement.reimbId;
    reimbursement.resolver = this.user;
    reimbursement.statusId = 3;

    this.reimbursementService.updateReimbursement(reimbursement);
  }

  doFilter(newFilter: string) {
    this.setFilter = newFilter;

    if (this.setFilter === 'All') {
      this.reimbursementDisplay = this.reimbursementList;
    } else {
      this.reimbursementDisplay = this.reimbursementList.filter(
        reimbursement => reimbursement.statusId === Status[this.setFilter]);
    }
  }

  enlargeReceipt(receipt) {
    const modalRef = this.modalService.open(ReimbursementReceiptModalComponent);
    modalRef.componentInstance.receipt = receipt;
  }
}
