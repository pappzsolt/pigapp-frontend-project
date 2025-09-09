import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuService } from '../services/sidebar-menu.service';
import { AuthService } from '../services/auth.service';
import { MonthlyCostService } from '../services/monthly-cost-forecast.service';
import { CostSummary, CostGroupResponse, CostData } from '../../model/invoice_sum_cost.model';
import { UpcomingCost } from '../../model/cost';
import { MonthlyCostForecast } from '../../model/monthly-cost-forecast.model';

@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  summaries: CostSummary[] = [];
  @Input() totalPaid: number = 0;
  @Input() totalUnpaid: number = 0;
  @Input() upcomingCosts: UpcomingCost[] = [];
  @Input() monthlyCosts: MonthlyCostForecast[] = [];
  constructor(
    private authService: AuthService,
    private sidebarMenuService: SidebarMenuService,
    private monthlyCostService: MonthlyCostService
  ) {}
  calculateTotals(): void {
    this.totalPaid = this.summaries.reduce((acc, curr) => acc + parseFloat(curr.total_paid), 0);
    this.totalUnpaid = this.summaries.reduce((acc, curr) => acc + parseFloat(curr.total_unpaid), 0);
  }
  getMonthlySummary(): void {
    this.sidebarMenuService.getMonthlySummary().subscribe({
      next: data => {
        this.summaries = data;
        this.calculateTotals();
      },
    });
  }

  ngOnInit(): void {
    this.getMonthlySummary();

    this.sidebarMenuService.getUpcomingCosts().subscribe({
      next: data => (this.upcomingCosts = data),
      error: err => console.error(err),
    });
    this.monthlyCostService.getMonthlyCostForecast().subscribe({
      next: data => (this.monthlyCosts = data),
      error: err => console.error(err),
    });
  }
}
