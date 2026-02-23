// unpaid-cost.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UnpaidCost } from '../../model/unpaid-cost.interface';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UnpaidCostService {
  constructor(private http: HttpClient) {}

  private transformCost(cost: any): UnpaidCost & { selected: boolean } {
    return {
      id: cost.id,
      cost_name: cost.cost_name,
      cost_note: cost.cost_note, // ← most már ok
      amount: cost.amount,
      cost_date: cost.cost_date,
      paid: !!cost.paid,
      invoice: cost.invoice
        ? {
            id: cost.invoice.id,
            invoice_name: cost.invoice.invoice_name,
            invoice_note: cost.invoice.invoice_note,
            create_invoice_date: cost.invoice.create_invoice_date,
            amount: cost.invoice.amount,
            user: cost.invoice.user,
            enable_invoice: !!cost.invoice.enable_invoice,
          }
        : undefined,
      dev: cost.dev ? { id: cost.dev.id, name: cost.dev.dev_name } : undefined,
      costgroup: cost.costgroup
        ? { id: cost.costgroup.id, group_name: cost.costgroup.group_name }
        : undefined,
      user: cost.user ? { id: cost.user.id, username: cost.user.username } : undefined,
      selected: false,
    };
  }

  getUnpaidCosts(): Observable<(UnpaidCost & { selected: boolean })[]> {
    return this.http
      .get<UnpaidCost[]>(ApiEndpoints.costs.costCheck)
      .pipe(map(data => data.map(cost => this.transformCost(cost))));
  }
}
