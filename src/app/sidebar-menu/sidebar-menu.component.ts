import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuService } from '../services/sidebar-menu.service';
import { AuthService } from '../services/auth.service';
import { CostSummary, CostGroupResponse, CostData } from '../../model/invoice_sum_cost.model';
@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  summaries: CostSummary[] = [];
  @Input()  totalPaid: number = 0;
  @Input()  totalUnpaid: number = 0;
  constructor(
    private authService: AuthService,
    private sidebarMenuService: SidebarMenuService
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
  }
}
