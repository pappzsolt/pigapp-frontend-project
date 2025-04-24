import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostData, CostGroupResponse } from '../../model/invoice_sum_cost.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CostStatService {
  private apiCostGroupCostUrl = environment.apiCostGroupCostUrl;

  private apiCurrentMonthCostGroupUrl = environment.apiCurrentMonthCostGroupUrl;

  constructor(private http: HttpClient) {}

  getCostGroupData(): Observable<CostGroupResponse> {
    return this.http.get<CostGroupResponse>(this.apiCostGroupCostUrl);
  }
  getCurrentMonthCostGroup5(): Observable<CostData[]> {
    return this.http.get<CostData[]>(this.apiCurrentMonthCostGroupUrl);
  }
}
