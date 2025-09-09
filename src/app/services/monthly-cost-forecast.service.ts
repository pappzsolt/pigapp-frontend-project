import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCostForecast } from '../../model/monthly-cost-forecast.model';
import { ApiConfigService } from './api-config.service';
@Injectable({
  providedIn: 'root'
})
export class MonthlyCostService {
  // API endpoint
  private apiUrl = 'http://192.168.1.37/api/monthly-cost-forecast/';

  constructor(private http: HttpClient,private apiConfig: ApiConfigService) {}

  /**
   * Lekéri az aktuális hónap + 6 hónap előre költségelőrejelzését
   */
  getMonthlyCostForecast(): Observable<MonthlyCostForecast[]> {
    return this.http.get<MonthlyCostForecast[]>(this.apiConfig.apiEnvironment.apiMonthlyCostForeCast);
  }
}

