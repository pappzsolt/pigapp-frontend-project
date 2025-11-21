import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostSummary } from '../../model/invoice_sum_cost.model';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private http = inject(HttpClient);

  constructor() {}

  getMonthlySummary(): Observable<CostSummary[]> {
    return this.http.get<CostSummary[]>(ApiEndpoints.costs.summary);
  }
}
