import { TransactionInputModel } from './../models/transactionInput.model';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';

import { ConfirmationPageComponent } from './../core/confirmation-page/confirmation-page.component';
import {TransactionFormComponent} from './../transaction-form/transaction-form.component';
import { TransactionService } from './../services/transactions.service';

import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  displayedColumns: string[] = ['street', 'city', 'state', 'edit', 'delete'];
  data: DataTableDataSource;
  transactionInput = new TransactionInputModel();

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private TransactionService: TransactionService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.refresh();
  }


  openTransactionForm(transaction): void {
    const formDialogRef = this.dialog.open(TransactionFormComponent, {
      width: '700px',
      data: transaction
    });

    formDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  openConfirmationPage(transaction): void {
    const confirmDialogRef = this.dialog.open(ConfirmationPageComponent, {
      width: '700px',
      data: transaction
    });

    confirmDialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.data = new DataTableDataSource(this.TransactionService);
    this.data.loadTransactions();
    this.changeDetectorRefs.detectChanges();
    this.table.renderRows();
  }
}

