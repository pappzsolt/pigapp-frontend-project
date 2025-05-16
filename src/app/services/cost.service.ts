// src/app/services/cost.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost } from '../../model/cost';
import { ForeignKeyData } from '../../model/foreignkeydata';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  createCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.apiConfig.apiEnvironment.apiCreateCostUrl, cost);
  }

  getCost(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${this.apiConfig.apiEnvironment.apiCreateCostUrl}${id}/`);
  }
  getForeignKeyData(): Observable<ForeignKeyData> {
    return this.http.get<ForeignKeyData>(this.apiConfig.apiEnvironment.apiForeignKeyDataUrl);
  }
  updateCost(id: number, cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.apiConfig.apiEnvironment.apiDetailCostUrl}${id}/`, cost);
  }

  deleteCost(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.apiEnvironment.apiDetailCostUrl}${id}/`);
  }

  // src/app/components/services/cost.service.ts
  getCosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiConfig.apiEnvironment.apiCostListUrl}?page=${page}`);
  }
  filterCosts(searchDate: string): Observable<Cost[]> {
    return this.http.get<Cost[]>(`${this.apiConfig.apiEnvironment.filterCostUrl}${searchDate}`);
  }
}
