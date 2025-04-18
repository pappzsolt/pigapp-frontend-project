import { Component, OnInit } from '@angular/core';
import { CostSummary, InvoiceIdWithName, InvoiceSumCost } from '../../model/invoice_sum_cost.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InfoService } from '../services/info.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{

  summaries: CostSummary[] = [];
  loading = true;
  error = '';
  totalPaid = 0;
  totalUnpaid = 0;
  selectedMonth: string = ''; // Dátum kiválasztás

  constructor(private infoService: InfoService){

  }

  ngOnInit(): void {
    this.getMonthlySummary();

  }

  getMonthlySummary(): void {
    this.infoService.getMonthlySummary().subscribe({
      next: (data) => {
        this.summaries = data;
        this.calculateTotals();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Hiba történt az adatok lekérésekor.';
        this.loading = false;
      }
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
