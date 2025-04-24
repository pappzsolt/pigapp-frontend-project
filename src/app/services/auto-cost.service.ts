import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCostResponse } from '../../model/cost';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AutoCostService {
  private apiMonthlyCostsUrl = environment.apiMonthlyCostsUrl;
  private apiUpdateCostDatesUrl = environment.apiUpdateCostDatesUrl;

  constructor(private http: HttpClient) {}

  getMonthlyCosts(): Observable<MonthlyCostResponse> {
    return this.http.get<MonthlyCostResponse>(this.apiMonthlyCostsUrl);
  }
  updateCostDates(costIds: number[]): Observable<any> {
    return this.http.post<any>(this.apiUpdateCostDatesUrl, { cost_ids: costIds });
  }
}
