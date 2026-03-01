// src/app/components/cost-past-list/cost-past-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CostPastService } from '../../../services/cost-past.service';
import { CostPast } from '../../../../model/costpast.model';

@Component({
  selector: 'app-cost-past-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cost-past-list.component.html',
  styleUrls: ['./cost-past-list.component.css'],
})
export class CostPastListComponent implements OnInit {
  costs: CostPast[] = [];
  loading = false;
  error: string | null = null;

  /** Kiválasztott costok új hónapra */
  selectedCostsForNextMonth: CostPast[] = [];

  constructor(private costPastService: CostPastService) {}

  ngOnInit(): void {
    this.loadCosts();
  }

  loadCosts(): void {
    this.loading = true;
    this.costPastService.getPreviousMonthCosts().subscribe({
      next: data => {
        this.costs = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Hiba a költségek lekérésekor';
        this.loading = false;
      },
    });
  }

  /* ===============================
     KIVÁLASZTÁS KEZELÉS
  =============================== */

  toggleSelection(cost: CostPast): void {
    const index = this.selectedCostsForNextMonth.findIndex(c => c.id === cost.id);

    if (index > -1) {
      this.selectedCostsForNextMonth.splice(index, 1);
    } else {
      this.selectedCostsForNextMonth.push(cost);
    }
  }

  isSelected(cost: CostPast): boolean {
    return this.selectedCostsForNextMonth.some(c => c.id === cost.id);
  }

  /* ===============================
     PATCH
  =============================== */

  saveCost(cost: CostPast): void {
    const updatedFields: Partial<CostPast> = {
      cost_name: cost.cost_name,
      cost_note: cost.cost_note,
      amount: cost.amount,
      cost_date: cost.cost_date,
      paid: cost.paid,
      paid_date: cost.paid_date,
      invoice: cost.invoice,
      dev: cost.dev,
      costrepeat: cost.costrepeat,
      costgroup: cost.costgroup,
      user: cost.user,
    };

    this.costPastService.updateCost(cost.id, updatedFields).subscribe({
      next: updatedCost => {
        const index = this.costs.findIndex(c => c.id === updatedCost.id);
        if (index > -1) {
          this.costs[index] = { ...this.costs[index], ...updatedCost };
        }
      },
      error: () => alert('Hiba a költség frissítésekor'),
    });
  }

  /* ===============================
     DELETE
  =============================== */

  deleteCost(id: number): void {
    if (confirm('Biztos törölni akarod ezt a költséget?')) {
      this.costPastService.deleteCost(id).subscribe({
        next: () => this.loadCosts(),
        error: () => alert('Hiba a törléskor'),
      });
    }
  }

  /* ===============================
     ÚJ HÓNAP LÉTREHOZÁS
  =============================== */

  createNextMonthCosts(): void {
    if (this.selectedCostsForNextMonth.length === 0) {
      alert('Nincs kiválasztott cost!');
      return;
    }

    const payload = this.selectedCostsForNextMonth.map(c => ({
      id: c.id,
      cost_name: c.cost_name,
      cost_note: c.cost_note,
      amount: c.amount,
      paid: c.paid,
      invoice: c.invoice,
      dev: c.dev,
      costrepeat: c.costrepeat,
      costgroup: c.costgroup,
      user: c.user,
    }));

    this.costPastService.createFromPreviousMonth(payload).subscribe({
      next: newCosts => {
        alert('Új hónapra másolt costok létrehozva!');
        this.costs = [...this.costs, ...newCosts];
        this.selectedCostsForNextMonth = [];
      },
      error: () => alert('Hiba a costok másolásakor'),
    });
  }

  /* ===============================
     TOTAL
  =============================== */

  get totalAmount(): number {
    return this.costs.reduce((sum, c) => sum + (c.amount || 0), 0);
  }
}
