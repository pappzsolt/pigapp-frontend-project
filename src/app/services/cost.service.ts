// src/app/services/cost.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost } from '../../model/cost';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  private apCreateCostUrl = "http://192.168.1.37:8000/api/pigapp_app/create-cost/";
  private apiCostListUrl = "http://192.168.1.37:8000/api/pigapp_app/cost_list_natur/";
  private apiForeignKeyDataUrl = "http://192.168.1.37:8000/api/pigapp_app/foreignkey-data/";
  private apiDeleteCostUrl = "http://192.168.1.37:8000/api/pigapp_app/cost-detail/";
  constructor(private http: HttpClient) {}

  // Költség hozzáadása
  /* ITT KELL a SZAMLABOL LEVONNI amit hozzadtam költséget
  cashflow hozza adas itt az invoice hoz hozzakell adni


  */
  createCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.apCreateCostUrl, cost);
  }

  getCost(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${this.apCreateCostUrl}${id}/`);
  }
  getForeignKeyData(): Observable<any> {
    return this.http.get<any>(this.apiForeignKeyDataUrl);
  }
  updateCost(id: number, cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.apCreateCostUrl}${id}/`, cost);
  }

  deleteCost(id: number): Observable<any> {
    return this.http.delete(`${this.apiDeleteCostUrl}${id}/`);
  }

// src/app/components/services/cost.service.ts
  getCosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiCostListUrl}?page=${page}`);
  }


}
