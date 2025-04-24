import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCostResponse } from '../../model/cost';
import { environment } from '../../environments/environment.prod';
import { ApiConfigService } from './api-config.service';
@Injectable({
  providedIn: 'root',
})
export class AutoCostService {


  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getMonthlyCosts(): Observable<MonthlyCostResponse> {
    return this.http.get<MonthlyCostResponse>(this.apiConfig.apiEnvironment.apiMonthlyCostsUrl);
  }
  updateCostDates(costIds: number[]): Observable<any> {
    return this.http.post<any>(this.apiConfig.apiEnvironment.apiUpdateCostDatesUrl, {
      cost_ids: costIds,
    });
  }
}
