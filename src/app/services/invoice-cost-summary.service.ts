import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceCostSummary } from '../../model/invoice-cost-summary.model';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceCostSummaryService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getInvoiceCostSummary(): Observable<InvoiceCostSummary[]> {
    return this.http.get<InvoiceCostSummary[]>(
      this.apiConfig.apiEnvironment.apiCostRepeatInvoiceSummary
    );
  }
}
