import { TransactionService } from './../services/transactions.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private TransactionsService: TransactionService,
    private snackBar: MatSnackBar,
    public formDialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.initForm();
    this.transactionForm.setValue({
      street: this.data.street,
      city: this.data.city,
      state: this.data.state
    })
  }

  initForm() {
    this.transactionForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    })
  }

  submit() {
    if(this.data.id === undefined) {
      this.TransactionsService.addTransaction(this.transactionForm.value).subscribe((res: any) => {
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
      this.TransactionsService.updateTransaction(this.data.id, this.transactionForm.value).subscribe((res: any) => {
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
