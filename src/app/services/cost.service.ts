// src/app/services/cost.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost } from '../../model/cost';
import { ForeignKeyData } from '../../model/foreignkeydata';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  constructor(private http: HttpClient) {}

  createCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(ApiEndpoints.costs.create, cost);
  }

  getCost(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${ApiEndpoints.costs.create}${id}/`);
  }

  getForeignKeyData(): Observable<ForeignKeyData> {
    return this.http.get<ForeignKeyData>(ApiEndpoints.costs.foreignKeyData);
  }

  updateCost(id: number, cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${ApiEndpoints.costs.detail}${id}/`, cost);
  }

  deleteCost(id: number): Observable<any> {
    return this.http.delete(`${ApiEndpoints.costs.detail}${id}/`);
  }

  getCosts(page: number): Observable<any> {
    return this.http.get<any>(`${ApiEndpoints.costs.list}?page=${page}`);
  }

  filterCosts(searchDate: string): Observable<Cost[]> {
    return this.http.get<Cost[]>(`${ApiEndpoints.costs.filterActualDay}${searchDate}`);
  }
}
