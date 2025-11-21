import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse, InvoiceTransferResponse } from '../../model/invoice';
import { CalculateCashResponse, MonthlyCostResponse } from '../../model/cost';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTransformService {
  constructor(private http: HttpClient) {}

  getInvoiceOptions(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(ApiEndpoints.invoices.combo);
  }

  transferAmount(szamla1: number, szamla2: number, amount: number) {
    return this.http.patch<InvoiceTransferResponse>(
      `${ApiEndpoints.invoices.transfer}${szamla1}/${szamla2}`,
      { amount }
    );
  }

  getMonthlyCosts(): Observable<MonthlyCostResponse> {
    return this.http.get<MonthlyCostResponse>(ApiEndpoints.monthly.monthlyCosts);
  }

  calculateCash(costIds: number[]): Observable<CalculateCashResponse> {
    return this.http.post<CalculateCashResponse>(
      ApiEndpoints.cashFlow.calculateCash,
      { cost_ids: costIds }
    );
  }
}
