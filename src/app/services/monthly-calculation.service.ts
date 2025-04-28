import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  Invoice,
  InvoiceSummary,
  InvoiceWithCostDetail,
  TotalAmountInvoice,
} from '../../model/invoice';
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
}
