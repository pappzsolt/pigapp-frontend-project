// src/app/components/upcoming-costs/upcoming-costs.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UpcomingCostsResponse,
  UpcomingCostItem,
  UpcomingMonthData,
} from '../../models/upcoming-costs.model';
import { UpcomingCostsService } from '../../services/upcoming-costs.service';

@Component({
  selector: 'app-upcoming-costs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-costs.component.html',
})
export class UpcomingCostsComponent implements OnInit {
  data: UpcomingCostsResponse | null = null;
  loading = false;
  error: string | null = null;

  constructor(private upcomingCostsService: UpcomingCostsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.upcomingCostsService.getUpcomingCosts().subscribe({
      next: (response) => {
        if (!response.success) {
          this.error = response.error ?? 'Ismeretlen hiba történt.';
          this.data = null;
        } else {
          this.data = response;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nem sikerült betölteni az adatokat.';
        console.error('UpcomingCosts error:', err);
        this.loading = false;
        this.data = null;
      },
    });
  }

  trackByCostId(index: number, item: UpcomingCostItem): number {
    return item.id;
  }

  get currentMonth(): UpcomingMonthData | null {
    return this.data?.current_month ?? null;
  }

  get nextMonth(): UpcomingMonthData | null {
    return this.data?.next_month ?? null;
  }
}
