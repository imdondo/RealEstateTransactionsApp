import { TransactionsService } from './../../services/transactions.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit {
  constructor(
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    public confirmDialogRef: MatDialogRef<ConfirmationPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {}

  removeBeneficiary() {
    this.beneficiariesService.removeBeneficiary(this.data.id).subscribe(
      (res: any) => {
        this.confirmDialogRef.close()
        this.snackBar.open(res.message, '', {
          duration: 3000
        });
      },
      (err: any) => {
        this.confirmDialogRef.close()
        this.snackBar.open(err.message, '', {
          duration: 3000
        });
      }
    )
  }

  cancel() {
    this.confirmDialogRef.close();
  }

}
