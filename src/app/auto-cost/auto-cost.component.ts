import { Component, OnInit } from '@angular/core';
import { AutoCost, MonthlyCostResponse } from '../../model/cost';
import { AutoCostService } from '../services/auto-cost.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonDirective } from '../shared/directives/button.directive'; // pontos útvonal a fájlhoz
import { AutoCostTableComponent } from './auto-cost-table/auto-cost-table.component'; // vagy ahova elhelyezed

@Component({
  selector: 'app-cost-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AlertComponent, ButtonDirective,AutoCostTableComponent],
  templateUrl: './auto-cost.component.html',
  styleUrls: ['./auto-cost.component.css'],
})
export class AutoCostComponent implements OnInit {
  autoCosts: AutoCost[] = [];
  disabledCostIds: number[] = [];
  insertedCosts: AutoCost[] = [];
  message: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(private autoCostService: AutoCostService) {}

  ngOnInit(): void {
    this.autoCostService.getMonthlyCosts().subscribe({
      next: (response: MonthlyCostResponse) => {
        if (response.success) {
          this.autoCosts = response.data;
        } else {
          this.error = response.message;
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Hiba történt az adatok betöltésekor.';
        this.isLoading = false;
      },
    });
  }

  // Getter: visszaadja a kijelölt költségek ID-it
  get selectedCosts(): number[] {
    return this.autoCosts.filter(cost => cost.selected).map(cost => cost.id);
  }

  toggleSelection(cost: AutoCost): void {
    cost.selected = !cost.selected;
  }

  setAllSelected(state: boolean): void {
    this.autoCosts.forEach(cost => (cost.selected = state));
  }

  updateCostDates(): void {
    const selectedCostIds = this.selectedCosts;

    if (selectedCostIds.length > 0) {
      this.autoCostService.updateCostDates(selectedCostIds).subscribe({
        next: response => {
          if (response.success) {
            this.message = response.message;
            this.insertedCosts = response.data || [];
            this.disabledCostIds = [...this.disabledCostIds, ...selectedCostIds];
          } else {
            this.error = response.message;
          }
        },
        error: () => {
          this.error = 'Hiba történt a dátumok frissítésekor.';
        },
      });
    } else {
      this.error = 'Nincs kiválasztott költség.';
    }
  }
  onSelectionChange(): void {
    const selectedIds = this.selectedCosts;
  }
}

