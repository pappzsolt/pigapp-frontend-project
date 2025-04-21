import { Component, OnInit } from '@angular/core';
import { AutoCost, MonthlyCostResponse } from '../../model/cost';
import { AutoCostService } from '../services/auto-cost.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // FormsModule importálása

@Component({
  selector: 'app-cost-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
          // this.message = response.message;
        } else {
          this.error = response.message;
        }
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Hiba történt az adatok betöltésekor.';
        this.isLoading = false;
      },
    });
  }

  // A kijelölés beállítása
  toggleSelection(cost: AutoCost): void {
    cost.selected = !cost.selected;
  }

  selectedCosts(): number[] {
    const selectedCostIds = this.autoCosts
      .filter(cost => cost.selected) // Csak a kijelölt költségek
      .map(cost => cost.id); // Az id-kat gyűjtjük össze

    return selectedCostIds; // Visszaadjuk a kiválasztott költségek ID-jait
  }

  selectAllCosts(): void {
    this.autoCosts.forEach(cost => (cost.selected = true));
    this.selectedCosts(); // Hívjuk meg a selectedCosts metódust, hogy frissítsük a kijelölt költségeket
  }

  deselectAllCosts(): void {
    this.autoCosts.forEach(cost => (cost.selected = false));
    this.selectedCosts(); // Hívjuk meg a selectedCosts metódust, hogy frissítsük a kijelölt költségeket
  }
  updateCostDates(): void {
    const selectedCostIds = this.selectedCosts();

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
        error: err => {
          this.error = 'Hiba történt a dátumok frissítésekor.';
        },
      });
    } else {
      this.error = 'Nincs kiválasztott költség.';
    }
  }
}
