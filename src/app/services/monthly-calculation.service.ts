import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  Invoice,
  InvoiceSummary,
  InvoiceWithCostDetail,
  TotalAmountInvoice,
} from '../../model/invoice';
import { UpcomingCost } from '../../model/cost';
import { ForeignKeyData } from '../../model/foreignkeydata';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class MonthlyCalculationService {
  private http = inject(HttpClient);

  constructor() {}

  /* apiAllInvoiceSumAmountUrl → ApiEndpoints.invoices.allInvoiceSumAmount */
  getTotalAmountInvoice(): Observable<TotalAmountInvoice> {
    return this.http.get<TotalAmountInvoice>(ApiEndpoints.invoices.allInvoiceSumAmount);
  }

  /* apiOnlyInvoiceListUrl → ApiEndpoints.invoices.onlyInvoiceList */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(ApiEndpoints.invoices.onlyInvoiceList);
  }

  /* apiCostSummaryWithInvoiceUrl → ApiEndpoints.costs.summaryWithInvoice */
  getInvoicesCostSummary(): Observable<InvoiceSummary[]> {
    return this.http.get<InvoiceSummary[]>(ApiEndpoints.costs.summaryWithInvoice);
  }

  /* apiInvoiceDetail → ApiEndpoints.invoices.detail */
  getInvoiceWithCostDetail(invoiceId: number): Observable<InvoiceWithCostDetail[]> {
    return this.http.get<InvoiceWithCostDetail[]>(
      `${ApiEndpoints.invoices.detail}${invoiceId}`
    );
  }

  /* apiForeignKeyDataUrl → ApiEndpoints.costs.foreignKeyData */
  getForeignKeyData(): Observable<ForeignKeyData> {
    return this.http.get<ForeignKeyData>(ApiEndpoints.costs.foreignKeyData);
  }

  /* apiUpComingUnpaidCostsUrl → ApiEndpoints.costs.upcomingUnpaid */
  getUpcomingCosts(): Observable<UpcomingCost[]> {
    return this.http.get<UpcomingCost[]>(ApiEndpoints.costs.upcomingUnpaid).pipe(
      catchError(error => {
        console.error('Hiba a közelgő költségek lekérésekor:', error);
        return throwError(() => new Error('Nem sikerült betölteni az adatokat.'));
      })
    );
  }
}
