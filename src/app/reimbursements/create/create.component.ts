import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Reimbursement } from '../../models/reimbursement';
import { ReimbursementService } from '../../services/reimbursement.service';

@Component({
  selector: 'app-reimbursement-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.css' ]
})
export class ReimbursementCreateComponent implements OnInit {
  constructor(private reimbursementService: ReimbursementService, private router: Router) { }

  private reimbursement: Reimbursement = new Reimbursement();

  reactiveForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  @ViewChild('fileInput') fileInput;

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.reimbursement.receipt = reader.result;
      };
    }
  }

  onSubmit() {
    this.reimbursement.amount = this.reactiveForm.controls.amount.value;
    this.reimbursement.description = this.reactiveForm.controls.description.value;
    this.reimbursement.author = JSON.parse(localStorage.getItem('currentUser'));
    this.reimbursement.typeId = this.reactiveForm.controls.type.value;

    this.reimbursementService.createReimbursement(this.reimbursement)
      .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP error', err),
        () => this.router.navigate([ 'reimbursements/view' ]).then()
    );
  }

  ngOnInit(): void { }
}
