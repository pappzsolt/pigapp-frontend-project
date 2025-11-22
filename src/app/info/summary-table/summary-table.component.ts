import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostSummary } from '../../../model/invoice_sum_cost.model';
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective],
  templateUrl: './summary-table.component.html',
})
export class SummaryTableComponent {
  @Input() summaries: CostSummary[] = [];

  getPaidPercent(summary: CostSummary): number {
    const total = Number(summary?.invoice?.amount) || 0;
    const paid = Number(summary?.total_paid) || 0;

    if (total <= 0) {
      return 0;
    }

    return (paid / total) * 100;
  }
}
