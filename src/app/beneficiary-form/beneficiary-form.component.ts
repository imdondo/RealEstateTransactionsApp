import { BeneficiariesService } from './../services/beneficiaries.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss']
})
export class BeneficiaryFormComponent implements OnInit {
  beneficiaryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private snackBar: MatSnackBar,
    public formDialogRef: MatDialogRef<BeneficiaryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.initForm();
    this.beneficiaryForm.setValue({
      beneficiaryName: this.data.beneficiaryName,
      accountNumber: this.data.accountNumber,
      bankName: this.data.bankName
    })
  }

  initForm() {
    this.beneficiaryForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
    })
  }

  submit() {
    if(this.data.id === undefined) {
      this.beneficiariesService.addBeneficiary(this.beneficiaryForm.value).subscribe((res: any) => {
        this.formDialogRef.close();
        this.snackBar.open(res.message, '', {
          duration: 3000
        });
      },
      (err: any) => {
        this.formDialogRef.close();
        this.snackBar.open(err.message, '', {
          duration: 3000
        })
      });
    } else {
      this.beneficiariesService.updateBeneficiary(this.data.id, this.beneficiaryForm.value).subscribe((res: any) => {
        this.formDialogRef.close();
        this.snackBar.open(res.message, '', {
          duration: 3000
        });
      },
      (err: any) => {
        this.formDialogRef.close();
        this.snackBar.open(err.message, '', {
          duration: 3000
        })
      });
    }
  }

  cancel() {
    this.formDialogRef.close();
  }

}