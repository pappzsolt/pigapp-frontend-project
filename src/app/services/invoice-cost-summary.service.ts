import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceCostSummary } from '../../model/invoice-cost-summary.model';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class InvoiceCostSummaryService {
  constructor(private http: HttpClient) {}

  getInvoiceCostSummary(): Observable<InvoiceCostSummary[]> {
    return this.http.get<InvoiceCostSummary[]>(ApiEndpoints.costRepeat.invoiceSummary);
  }
}

