import { BeneficiaryInputModel } from './../models/BeneficiaryInput.model';
import { BeneficiaryModel } from './../models/beneficiary.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:8080/beneficiaries';


@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {
  public beneficiaries: BeneficiaryModel[] = []

  constructor(private http: HttpClient) { }

  getBeneficiaries() {
    return this.http.get(URL);
  }

  addBeneficiary(beneficiary: BeneficiaryInputModel) {
    return this.http.post<BeneficiaryInputModel>(URL, beneficiary)
  }

  updateBeneficiary(id: number, beneficiary: BeneficiaryInputModel) {
    const UPDATE_URL = `${URL}/update/${id}`;
    return this.http.put<BeneficiaryInputModel>(UPDATE_URL, beneficiary)
  }

  removeBeneficiary(id: number) {
    const DELETE_URL = `${URL}/${id}`;
    return this.http.delete<BeneficiaryInputModel>(DELETE_URL)
  }
}
