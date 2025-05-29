import { Component, OnInit } from '@angular/core';
import { CostSummary, CostGroupResponse, CostData } from '../../model/invoice_sum_cost.model';
import { CommonModule } from '@angular/common';
import { InfoService } from '../services/info.service';
import { FormsModule } from '@angular/forms';
import { CostStatService } from '../services/coststat.service';
import { CostLoanSummaryComponent } from './cost-loan-summary/cost-loan-summary.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';
import { CostGroupSummaryComponent } from './cost-group-summary/cost-group-summary.component';
import { TotalSummaryComponent } from './cost-total-summary/cost-total-summary.component';
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CostLoanSummaryComponent,
    SummaryTableComponent,
    CostGroupSummaryComponent,
    TotalSummaryComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit {
  costGroupResponse!: CostGroupResponse;

  summaries: CostSummary[] = [];
  loading = true;
  error = '';
  totalPaid = 0;
  totalUnpaid = 0;
  selectedMonth: string = ''; // Dátum kiválasztás
  costData: CostData[] = [];

  constructor(
    private infoService: InfoService,
    private costStatService: CostStatService
  ) {}

  ngOnInit(): void {
    this.getMonthlySummary();
    this.loadCostGroupData();
    this.loadCostDataCost5();
  }

  loadCostDataCost5(): void {
    this.costStatService.getCurrentMonthCostGroup5().subscribe(
      data => {
        this.costData = data;
        this.loading = false;
      },
      error => {
        console.error('Error loading cost data:', error);
        this.error = 'Hiba történt az adatok betöltésekor';
        this.loading = false;
      }
    );
  }

  loadCostGroupData(): void {
    this.costStatService.getCostGroupData().subscribe(
      data => {
        this.costGroupResponse = data;
      },
      error => {
        console.error('Error loading cost group data', error);
      }
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getMonthlySummary(): void {
    this.infoService.getMonthlySummary().subscribe({
      next: data => {
        this.summaries = data;
        this.calculateTotals();
        this.loading = false;
      },
      error: () => {
        this.error = 'Hiba történt az adatok lekérésekor.';
        this.loading = false;
      },
    });
  }

  // Összesítők számítása
  calculateTotals(): void {
    this.totalPaid = this.summaries.reduce((acc, curr) => acc + parseFloat(curr.total_paid), 0);
    this.totalUnpaid = this.summaries.reduce((acc, curr) => acc + parseFloat(curr.total_unpaid), 0);
  }

  // Hónap szűrés
  filterByMonth(): void {
    if (this.selectedMonth) {
      // Szűrés dátum alapján (az API kérés szintjén vagy a frontend-en is)
      console.log('Szűrés a hónap szerint:', this.selectedMonth);
      // Hívás módosítása itt: pl. `this.getMonthlySummary(selectedMonth)`
    }
  }
}
