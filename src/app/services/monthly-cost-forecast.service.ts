import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCostForecast } from '../../model/monthly-cost-forecast.model';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class MonthlyCostService {
  constructor(private http: HttpClient) {}

  /**
   * Lekéri az aktuális hónap + 6 hónap előre költségelőrejelzését
   */
  getMonthlyCostForecast(): Observable<MonthlyCostForecast[]> {
    return this.http.get<MonthlyCostForecast[]>(ApiEndpoints.monthly.forecast);
  }
}


