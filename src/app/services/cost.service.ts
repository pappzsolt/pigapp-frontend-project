// src/app/services/cost.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost } from '../../model/cost';
import { ForeignKeyData } from '../../model/foreignkeydata';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  private apiCreateCostUrl = environment.apiCreateCostUrl;
  private apiCostListUrl = environment.apiCostListUrl;
  private apiForeignKeyDataUrl = environment.apiForeignKeyDataUrl;
  private apiDetailCostUrl = environment.apiDetailCostUrl;
  private filterCostUrl = environment.filterCostUrl;

  constructor(private http: HttpClient) {}

  createCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.apiCreateCostUrl, cost);
  }

  getCost(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${this.apiCreateCostUrl}${id}/`);
  }
  getForeignKeyData(): Observable<ForeignKeyData> {
    return this.http.get<ForeignKeyData>(this.apiForeignKeyDataUrl);
  }
  updateCost(id: number, cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.apiDetailCostUrl}${id}/`, cost);
  }

  deleteCost(id: number): Observable<any> {
    return this.http.delete(`${this.apiDetailCostUrl}${id}/`);
  }

  // src/app/components/services/cost.service.ts
  getCosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiCostListUrl}?page=${page}`);
  }
  filterCosts(searchDate: string): Observable<Cost[]> {
    return this.http.get<Cost[]>(`${this.filterCostUrl}${searchDate}`);
  }
}
