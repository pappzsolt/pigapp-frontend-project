import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCostResponse } from '../../model/cost';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AutoCostService {
  constructor(private http: HttpClient) {}

  getMonthlyCosts(): Observable<MonthlyCostResponse> {
    return this.http.get<MonthlyCostResponse>(ApiEndpoints.monthly.monthlyCosts);
  }

  updateCostDates(costIds: number[]): Observable<any> {
    return this.http.post<any>(ApiEndpoints.monthly.updateCostDates, {
      cost_ids: costIds,
    });
  }
}

