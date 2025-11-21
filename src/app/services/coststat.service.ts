import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostData, CostGroupResponse } from '../../model/invoice_sum_cost.model';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CostStatService {
  constructor(private http: HttpClient) {}

  getCostGroupData(): Observable<CostGroupResponse> {
    return this.http.get<CostGroupResponse>(ApiEndpoints.costs.groupCost);
  }

  getCurrentMonthCostGroup5(): Observable<CostData[]> {
    return this.http.get<CostData[]>(ApiEndpoints.costs.currentMonthCostGroup5);
  }
}
