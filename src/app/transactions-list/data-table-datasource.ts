import { TransactionService } from './../services/transactions.service';
import { TransactionModel } from './../models/transaction.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";

export class DataTableDataSource extends DataSource<TransactionModel> {

    private transactionsListSource = new BehaviorSubject<TransactionModel[]>([])
    transactionsList = this.transactionsListSource.asObservable();

    private isLoadingSource = new BehaviorSubject<boolean>(false)
    public isLoading$ = this.isLoadingSource.asObservable();

    private noTransactionsSource = new BehaviorSubject<boolean>(false)
    public noTransactions$ = this.noTransactionsSource.asObservable();

    constructor(protected TransactionsService: TransactionService) {
        super();
    }
    connect(): Observable<TransactionModel[]> {
        return this.transactionsList;
    }

    disconnect() {
        this.transactionsListSource.complete();
        this.isLoadingSource.complete();
        this.noTransactionsSource.complete();
    }

    loadTransactions() {
        this.isLoadingSource.next(true);
        this.TransactionsService.gettransactions().pipe(
            catchError(() => of([])),
            finalize(() => this.isLoadingSource.next(false))
)

        .subscribe((list: any) => {
            this.transactionsListSource.next(list.result)
            if(list.result.length === 0) {
                this.noTransactionsSource.next(true);
            }
        },
        err => this.noTransactionsSource.next(true)
        );
    }
}
