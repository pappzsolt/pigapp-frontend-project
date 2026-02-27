import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnpaidCostService } from './../../services/unpaid-cost.service';
import { UnpaidCost } from '../../../model/unpaid-cost.interface';

@Component({
  selector: 'app-unpaid-cost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unpaid-cost.component.html',
})
export class UnpaidCostComponent implements OnInit {
  costs: (UnpaidCost & { selected: boolean })[] = [];
  selectedCosts: { [id: number]: UnpaidCost & { selected: boolean } } = {};

  // ✅ Hónap lenyíló állapot
  openMonths = new Map<string, boolean>();

  loading = false;
  error = '';

  constructor(private unpaidCostService: UnpaidCostService) {}

  ngOnInit(): void {
    this.loadCosts();
  }

  loadCosts(): void {
    this.loading = true;

    this.unpaidCostService.getUnpaidCosts().subscribe({
      next: data => {
        // minden cost-hoz létrehozzuk a selected mezőt
        this.costs = data.map(cost => ({
          ...cost,
          selected: !!this.selectedCosts[cost.id]?.selected,
        }));

        // frissítjük a selectedCosts objektumot
        this.costs.forEach(cost => {
          this.selectedCosts[cost.id] = cost;
        });

        this.loading = false;
      },
      error: err => {
        this.error = 'Hiba a nem fizetett költségek lekérésekor';
        console.error(err);
        this.loading = false;
      },
    });
  }

  // ✅ Hónap nyitás/zárás
  toggleMonth(monthName: string): void {
    const current = this.openMonths.get(monthName);
    this.openMonths.set(monthName, !current);
  }

  isMonthOpen(monthName: string): boolean {
    return this.openMonths.get(monthName) ?? false;
  }

  get selectedTotal(): number {
    return Object.values(this.selectedCosts)
      .filter(c => c.selected)
      .reduce((sum, c) => sum + c.amount, 0);
  }

  // ===== találatok száma =====
  get totalResults(): number {
    return this.costs.length;
  }

  /**
   * Visszaadja a költségeket hónapok szerint csoportosítva.
   * Az eredmény: [{ name: '2026.02', items: [...] }, ...]
   */
  groupCostsByMonth(
    costs: (UnpaidCost & { selected: boolean })[]
  ): { name: string; items: (UnpaidCost & { selected: boolean })[] }[] {
    const grouped: {
      [month: string]: (UnpaidCost & { selected: boolean })[];
    } = {};

    costs.forEach(cost => {
      const date = new Date(cost.cost_date);

      const monthKey =
        `${date.getFullYear()}.` + `${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }

      grouped[monthKey].push(cost);
    });

    // Tömbbé alakítás és rendezés (legfrissebb hónap fent)
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .map(key => ({
        name: key,
        items: grouped[key],
      }));
  }
}
