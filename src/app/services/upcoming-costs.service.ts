// src/app/services/upcoming-costs.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpcomingCostsResponse } from '../models/upcoming-costs.model';

@Injectable({
  providedIn: 'root',
})
export class UpcomingCostsService {
  // TODO: ha van environment, tedd oda:
  // private readonly baseUrl = `${environment.apiUrl}/api/pigapp_app/api/upcoming-costs/`;
  private readonly baseUrl = 'http://127.0.0.1:8000/api/pigapp_app/api/upcoming-costs/';

  constructor(private http: HttpClient) {}

  getUpcomingCosts(): Observable<UpcomingCostsResponse> {
    return this.http.get<UpcomingCostsResponse>(this.baseUrl);
  }
}
