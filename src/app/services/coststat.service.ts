import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostData, CostGroupResponse } from '../../model/invoice_sum_cost.model';

import { ApiConfigService } from './api-config.service';
@Injectable({
  providedIn: 'root',
})
export class CostStatService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getCostGroupData(): Observable<CostGroupResponse> {
    return this.http.get<CostGroupResponse>(this.apiConfig.apiEnvironment.apiCostGroupCostUrl);
  }
  getCurrentMonthCostGroup5(): Observable<CostData[]> {
    return this.http.get<CostData[]>(this.apiConfig.apiEnvironment.apiCurrentMonthCostGroupUrl);
  }
}
