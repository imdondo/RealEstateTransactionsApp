import { BeneficiaryInputModel } from './../models/BeneficiaryInput.model';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';

import { ConfirmationPageComponent } from './../core/confirmation-page/confirmation-page.component';
import { BeneficiaryFormComponent } from './../beneficiary-form/beneficiary-form.component';
import { BeneficiariesService } from './../services/beneficiaries.service';

import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss']
})
export class BeneficiariesListComponent implements OnInit {
  displayedColumns: string[] = ['beneficiaryName', 'accountNumber', 'bankName', 'edit', 'delete'];
  data: DataTableDataSource;
  beneficiaryInput = new BeneficiaryInputModel();

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private beneficiariesService: BeneficiariesService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.refresh();
  }


  openBeneficiaryForm(beneficiary): void {
    const formDialogRef = this.dialog.open(BeneficiaryFormComponent, {
      width: '700px',
      data: beneficiary
    });

    formDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  openConfirmationPage(beneficiary): void {
    const confirmDialogRef = this.dialog.open(ConfirmationPageComponent, {
      width: '700px',
      data: beneficiary
    });

    confirmDialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.data = new DataTableDataSource(this.beneficiariesService);
    this.data.loadBeneficiaries();
    this.changeDetectorRefs.detectChanges();
    this.table.renderRows();
  }
}

