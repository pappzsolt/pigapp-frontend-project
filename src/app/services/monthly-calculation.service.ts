import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import {
  Invoice,
  InvoiceSummary,
  InvoiceWithCostDetail,
  TotalAmountInvoice,
} from '../../model/invoice';

import {
  UpcomingCost
} from '../../model/cost';

import { ApiConfigService } from './api-config.service';
import { ForeignKeyData } from '../../model/foreignkeydata';

@Injectable({
  providedIn: 'root',
})
export class MonthlyCalculationService {
  private http = inject(HttpClient);

  constructor(private apiConfig: ApiConfigService) {}

  /* apiAllInvoiceSumAmountUrl */
  getTotalAmountInvoice(): Observable<TotalAmountInvoice> {
    return this.http.get<TotalAmountInvoice>(
      this.apiConfig.apiEnvironment.apiAllInvoiceSumAmountUrl
    );
  }
  /* apiOnlyInvoiceListUrl */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiConfig.apiEnvironment.apiOnlyInvoiceListUrl);
  }
  /* apiCostSummaryWithInvoiceUrl */
  getInvoicesCostSummary(): Observable<InvoiceSummary[]> {
    return this.http.get<InvoiceSummary[]>(
      this.apiConfig.apiEnvironment.apiCostSummaryWithInvoiceUrl
    );
  }
  getInvoiceWithCostDetail(invoiceId: number): Observable<InvoiceWithCostDetail[]> {
    return this.http.get<InvoiceWithCostDetail[]>(
      `${this.apiConfig.apiEnvironment.apiInvoiceDetail}/${invoiceId}`
    );
  }
  getForeignKeyData(): Observable<ForeignKeyData> {
    return this.http.get<ForeignKeyData>(this.apiConfig.apiEnvironment.apiForeignKeyDataUrl);
  }
  getUpcomingCosts(): Observable<UpcomingCost[]> {
    return this.http.get<UpcomingCost[]>(this.apiConfig.apiEnvironment.apiUpComingUnpaidCostsUrl).pipe(
      catchError((error) => {
        console.error('Hiba a közelgő költségek lekérésekor:', error);
        return throwError(() => new Error('Nem sikerült betölteni az adatokat.'));
      })
    );
  }
}

