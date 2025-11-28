// src/app/invoice-transform/services/bank-statement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  BankStatement,
  BankStatementItem,
  BankStatementMap,
  OutgoingByIbanItem,
  InternalTransfersSummary,
  CategoryTotalItem,
} from '../../model/bank-statement.model';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class BankStatementService {
  /**
   * Backend endpoint – itt most a PIGAPP_API-s lista endpoint:
   * /api/pigapp_app/api/cib-parse/  → nálad: bank-statements
   */
  private readonly baseUrl = ApiEndpoints.bankStatements.list;

  constructor(private http: HttpClient) {}

  /**
   * Teljes map:
   * {
   *   "Statement_PDF_...": { ... },
   *   ...
   * }
   */
  getStatementsMap(): Observable<BankStatementMap> {
    return this.http.get<BankStatementMap>(this.baseUrl);
  }

  /**
   * Lista:
   * [
   *   { id: 'Statement_PDF_...', data: { ... } },
   *   ...
   * ]
   */
  getStatementsAsList(): Observable<BankStatementItem[]> {
    return this.getStatementsMap().pipe(
      map((response) =>
        Object.entries(response).map(([id, data]) => ({
          id,
          data,
        })),
      ),
    );
  }

  /**
   * Egy konkrét kivonat ID alapján (ha lesz külön detail endpoint).
   */
  getStatementById(id: string): Observable<BankStatement> {
    return this.http.get<BankStatement>(
      `${this.baseUrl}/${encodeURIComponent(id)}`,
    );
  }

  // -----------------------------
  // Helper: napi költés grafikonhoz
  // -----------------------------
  getDailySpendingItems(
    statement: BankStatement,
  ): { date: string; amount: number }[] {
    if (!statement.daily_spending) {
      return [];
    }

    return Object.entries(statement.daily_spending)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // -----------------------------
  // Helper: összes kiadás (negatív összegek)
  // -----------------------------
  getTotalSpending(statement: BankStatement): number {
    return statement.all_transactions
      .filter((t) => t.osszeg < 0)
      .reduce((sum, t) => sum + t.osszeg, 0);
  }

  // -----------------------------
  // Helper: összes bevétel (pozitív összegek)
  // -----------------------------
  getTotalIncome(statement: BankStatement): number {
    return statement.all_transactions
      .filter((t) => t.osszeg > 0)
      .reduce((sum, t) => sum + t.osszeg, 0);
  }

  // -----------------------------
  // Helper: outgoing_by_iban → lista
  // -----------------------------
  getOutgoingByIbanItems(statement: BankStatement): OutgoingByIbanItem[] {
    if (!statement.outgoing_by_iban) {
      return [];
    }

    return Object.entries(statement.outgoing_by_iban).map(
      ([iban, value]) => ({
        iban,
        partner: value.partner,
        total_amount: value.total_amount,
        transactions: value.transactions,
      }),
    );
  }

  // -----------------------------
  // Helper: internal_transfers
  // -----------------------------
  getInternalTransfers(
    statement: BankStatement,
  ): InternalTransfersSummary | null {
    return statement.internal_transfers ?? null;
  }

  // -----------------------------
  // Helper: category_totals → lista
  // -----------------------------
  getCategoryTotalItems(statement: BankStatement): CategoryTotalItem[] {
    if (!statement.category_totals) {
      return [];
    }

    return Object.entries(statement.category_totals).map(
      ([category, amount]) => ({
        category,
        amount,
      }),
    );
  }
}
