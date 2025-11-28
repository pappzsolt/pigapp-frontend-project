// src/app/invoice-transform/invoice-transform.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

import {
  BankStatement,
  BankStatementItem,
  Transaction,
  OutgoingByIbanItem,
  InternalTransfersSummary,
  CategoryTotalItem,
} from '../../model/bank-statement.model';

import { BankStatementService } from '../services/bank-statement.service';

import { SummaryCardComponent } from '../shared/summary-card/summary-card.component';
import { TransferMessageComponent } from '../transfer-message/transfer-message.component';
import { CostTableComponent } from './cost-transform-table/cost-transform-table.component';
import { TailwindStyledTableDirective } from '../shared/directives/tailwind-styled-table.directive';
import { TailwindStyledSelectDirective } from '../shared/directives/tailwind-styled-select.directive';
import { ButtonDirective } from '../shared/directives/button.directive';

type SelectableTransaction = Transaction & { selected: boolean };

@Component({
  selector: 'app-invoice-transform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SummaryCardComponent,
    TransferMessageComponent,
    CostTableComponent,
    TailwindStyledTableDirective,
    TailwindStyledSelectDirective,
    ButtonDirective,
  ],
  templateUrl: './invoice-transform.component.html',
  styleUrls: ['./invoice-transform.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class InvoiceTransformComponent implements OnInit {
  // Backendből jövő kivonatok (map -> lista)
  statements: BankStatementItem[] = [];

  // Kiválasztott kivonat azonosító (Statement_PDF_...)
  selectedStatementId: string | null = null;

  // Kiválasztott kivonat adatai
  currentStatement: BankStatement | null = null;

  // Tranzakciók a kiválasztott kivonatból, checkbox flaggel
  transactions: SelectableTransaction[] = [];

  isLoading = true;
  error: string | null = null;

  constructor(private bankStatementService: BankStatementService) {}

  ngOnInit(): void {
    this.loadStatements();
  }

  // -----------------------------
  // Adatbetöltés a service-ből
  // -----------------------------

  private loadStatements(): void {
    this.isLoading = true;

    this.bankStatementService.getStatementsAsList().subscribe({
      next: (items) => {
        this.statements = items;

        // Ha van legalább egy kivonat, válasszuk ki az elsőt
        if (items.length > 0) {
          this.selectStatement(items[0].id);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a kivonatok betöltésekor:', err);
        this.error = 'Hiba történt a kivonatok betöltésekor.';
        this.isLoading = false;
      },
    });
  }

  // Kivonat váltása (pl. dropdownból vagy listából hívod)
  selectStatement(id: string): void {
    this.selectedStatementId = id;
    const found = this.statements.find((s) => s.id === id);

    if (!found) {
      this.currentStatement = null;
      this.transactions = [];
      return;
    }

    this.currentStatement = found.data;

    // Tranzakciók + selected flag inicializálása
    this.transactions = this.currentStatement.all_transactions.map((t) => ({
      ...t,
      selected: false,
    }));
  }

  // -----------------------------
  // Checkbox logika
  // -----------------------------

  onMasterCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }

    if (input.checked) {
      this.selectAll();
    } else {
      this.deselectAll();
    }
  }

  toggleTransactionSelection(tx: SelectableTransaction): void {
    tx.selected = !tx.selected;
  }

  selectAll(): void {
    this.transactions.forEach((t) => (t.selected = true));
  }

  deselectAll(): void {
    this.transactions.forEach((t) => (t.selected = false));
  }

  // Kijelölt tételek összesen (összeg mező)
  get selectedTotal(): number {
    return this.transactions
      .filter((t) => t.selected)
      .reduce((sum, t) => sum + t.osszeg, 0);
  }

  // -----------------------------
  // Extra helper összegzések
  // -----------------------------

  // Teljes kiadás a kivonaton
  get totalSpending(): number {
    if (!this.currentStatement) {
      return 0;
    }
    return this.bankStatementService.getTotalSpending(this.currentStatement);
  }

  // Teljes bevétel a kivonaton
  get totalIncome(): number {
    if (!this.currentStatement) {
      return 0;
    }
    return this.bankStatementService.getTotalIncome(this.currentStatement);
  }

  // Napi költés lista (grafikonhoz, statisztikához)
  get dailySpendingItems(): { date: string; amount: number }[] {
    if (!this.currentStatement) {
      return [];
    }
    return this.bankStatementService.getDailySpendingItems(
      this.currentStatement,
    );
  }

  // Kimenő utalások IBAN szerint
  get outgoingByIbanList(): OutgoingByIbanItem[] {
    if (!this.currentStatement) {
      return [];
    }
    return this.bankStatementService.getOutgoingByIbanItems(
      this.currentStatement,
    );
  }

  // Saját számlák közti utalások
  get internalTransfers(): InternalTransfersSummary | null {
    if (!this.currentStatement) {
      return null;
    }
    return this.bankStatementService.getInternalTransfers(
      this.currentStatement,
    );
  }

  // Kategória összesítések
  get categoryTotalItems(): CategoryTotalItem[] {
    if (!this.currentStatement) {
      return [];
    }
    return this.bankStatementService.getCategoryTotalItems(
      this.currentStatement,
    );
  }
  /**
   * Legnagyobb abszolút napi költés (daily_spending alapján).
   * Ezt használjuk a sávok szélességének arányosításához.
   */
  get maxDailySpendingAbs(): number {
    const items = this.dailySpendingItems;
    if (!items.length) {
      return 1;
    }

    return items.reduce((max, item) => {
      const val = Math.abs(item.amount);
      return val > max ? val : max;
    }, 0);
  }

  /**
   * Napi költés sáv szélessége %-ban.
   */
  getDailyBarWidth(amount: number): number {
    const max = this.maxDailySpendingAbs;
    if (max <= 0) {
      return 0;
    }
    const perc = (Math.abs(amount) / max) * 100;
    return Math.min(100, perc);
  }

}
