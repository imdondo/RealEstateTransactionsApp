import { TransactionInputModel } from './../models/TransactionInput.model';
import { TransactionModel } from './../models/transaction.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:8080/transactions';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public transactions: TransactionModel[] = []

  constructor(private http: HttpClient) { }

  gettransactions() {
    return this.http.get(URL);
  }

  addTransaction(beneficiary: TransactionInputModel) {
    return this.http.post<TransactionInputModel>(URL, beneficiary)
  }

  updateTransaction(id: number, beneficiary: TransactionInputModel) {
    const UPDATE_URL = `${URL}/update/${id}`;
    return this.http.put<TransactionInputModel>(UPDATE_URL, beneficiary)
  }

  removeTransaction(id: number) {
    const DELETE_URL = `${URL}/${id}`;
    return this.http.delete<TransactionInputModel>(DELETE_URL)
  }
}
