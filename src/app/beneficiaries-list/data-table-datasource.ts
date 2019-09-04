import { BeneficiariesService } from './../services/beneficiaries.service';
import { BeneficiaryModel } from './../models/beneficiary.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";

export class DataTableDataSource extends DataSource<BeneficiaryModel> {

    private beneficiaryListSource = new BehaviorSubject<BeneficiaryModel[]>([])
    beneficiaryList = this.beneficiaryListSource.asObservable();

    private isLoadingSource = new BehaviorSubject<boolean>(false)
    public isLoading$ = this.isLoadingSource.asObservable();

    private noBeneficiariesSource = new BehaviorSubject<boolean>(false)
    public noBeneficiaries$ = this.noBeneficiariesSource.asObservable();

    constructor(protected beneficiariesService: BeneficiariesService) {
        super();
    }
    connect(): Observable<BeneficiaryModel[]> {
        return this.beneficiaryList;
    }

    disconnect() {
        this.beneficiaryListSource.complete();
        this.isLoadingSource.complete();
        this.noBeneficiariesSource.complete();
    }

    loadBeneficiaries() {
        this.isLoadingSource.next(true);
        this.beneficiariesService.getBeneficiaries().pipe(
            catchError(() => of([])),
            finalize(() => this.isLoadingSource.next(false))
)

        .subscribe((list: any) => {
            this.beneficiaryListSource.next(list.result)
            if(list.result.length === 0) {
                this.noBeneficiariesSource.next(true);
            }
        },
        err => this.noBeneficiariesSource.next(true)
        );
    }
}