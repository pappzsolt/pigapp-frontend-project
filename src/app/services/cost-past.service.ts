// src/app/services/cost-past.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../core/api-endpoints';
import { CostPast } from '../../model/costpast.model';

@Injectable({
  providedIn: 'root',
})
export class CostPastService {

  private readonly baseUrl = ApiEndpoints.costs.previousMonth;

  constructor(private http: HttpClient) {}

  /**
   * Előző hónap costok lekérése
   */
  getPreviousMonthCosts(): Observable<CostPast[]> {
    return this.http.get<CostPast[]>(this.baseUrl);
  }

  /**
   * Cost részleges módosítása (PATCH)
   */
  updateCost(id: number, data: Partial<CostPast>): Observable<CostPast> {
    return this.http.patch<CostPast>(`${this.baseUrl}${id}/`, data);
  }

  /**
   * Cost teljes módosítása (PUT)
   */
  putCost(id: number, data: CostPast): Observable<CostPast> {
    return this.http.put<CostPast>(`${this.baseUrl}${id}/`, data);
  }

  /**
   * Cost törlése
   */
  deleteCost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }

  /**
   * Új rekord létrehozása kiválasztott costokból (+1 hónap)
   * @param selectedCosts Lista a frontendről: kiválasztott costok + opcionális mező felülírás
   */
  createFromPreviousMonth(selectedCosts: Partial<CostPast>[]): Observable<CostPast[]> {
    return this.http.post<CostPast[]>(this.baseUrl, selectedCosts);
  }
}
