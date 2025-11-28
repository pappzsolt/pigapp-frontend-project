import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BankStatement,
  BankStatementItem,
  BankStatementMap,
} from '../../model/bank-statement.model';

@Injectable({
  providedIn: 'root',
})
export class BankStatementService {
  /**
   * Backend endpoint – állítsd be arra, amit ténylegesen használsz,
   * pl. /api/bank-statements, /api/cib-statements stb.
   */
  private readonly baseUrl = '/api/bank-statements';

  constructor(private http: HttpClient) {}

  /**
   * Teljes map lekérése:
   * {
   *   "Statement_PDF_...": { ... },
   *   "Statement_PDF_...": { ... }
   * }
   */
  getStatementsMap(): Observable<BankStatementMap> {
    return this.http.get<BankStatementMap>(this.baseUrl);
  }

  /**
   * Listanézethez kényelmesebb forma:
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
   * Egy konkrét kivonat lekérése ID alapján.
   *
   * Feltételezés:
   *   GET /api/bank-statements/:id
   * közvetlenül a BankStatement objektumot adja vissza.
   *
   * Ha nálad itt is egy map jön (pl. { "Statement_PDF...": {...}}),
   * akkor a típust és a map-olást ennek megfelelően módosítani kell.
   */
  getStatementById(id: string): Observable<BankStatement> {
    return this.http.get<BankStatement>(
      `${this.baseUrl}/${encodeURIComponent(id)}`
    );
  }

  /**
   * Helper: napi költés (daily_spending) átalakítva grafikonbarát tömbbé.
   */
  getDailySpendingItems(
    statement: BankStatement
  ): { date: string; amount: number }[] {
    return Object.entries(statement.daily_spending)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Helper: összes kiadás (negatív összegek összege az all_transactions-ből).
   */
  getTotalSpending(statement: BankStatement): number {
    return statement.all_transactions
      .filter((t) => t.osszeg < 0)
      .reduce((sum, t) => sum + t.osszeg, 0);
  }

  /**
   * Helper: összes bevétel (pozitív összegek összege).
   */
  getTotalIncome(statement: BankStatement): number {
    return statement.all_transactions
      .filter((t) => t.osszeg > 0)
      .reduce((sum, t) => sum + t.osszeg, 0);
  }
}
