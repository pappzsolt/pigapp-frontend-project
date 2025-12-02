// src/app/services/upcoming-costs.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpcomingCostsResponse } from '../../model/upcoming-costs.model';
import { ApiEndpoints } from '../core/api-endpoints';
@Injectable({
  providedIn: 'root',
})
export class UpcomingCostsService {
  // TODO: ha van environment, tedd oda:
  // private readonly baseUrl = `${environment.apiUrl}/api/pigapp_app/api/upcoming-costs/`;
  private readonly baseUrl = ApiEndpoints.costs.upcomingCosts;

  constructor(private http: HttpClient) {}

  getUpcomingCosts(): Observable<UpcomingCostsResponse> {
    return this.http.get<UpcomingCostsResponse>(this.baseUrl);
  }
}
