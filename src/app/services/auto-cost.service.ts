import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost, MonthlyCostResponse } from '../../model/cost';

@Injectable({
  providedIn: 'root'
})
export class AutoCostService {


  private apiMonthlyCostsUrl = "http://192.168.1.37:8000/api/pigapp_app/api/monthly-costs/";
  private apiUpdateCostDatesUrl = "http://192.168.1.37:8000/api/pigapp_app/update-cost-dates/";

  constructor(private http: HttpClient) {}

getMonthlyCosts(): Observable<MonthlyCostResponse> {
    return this.http.get<MonthlyCostResponse>(this.apiMonthlyCostsUrl);
  }
updateCostDates(costIds: number[]): Observable<any> {
    return this.http.post<any>(this.apiUpdateCostDatesUrl, { cost_ids: costIds });
  }
}
