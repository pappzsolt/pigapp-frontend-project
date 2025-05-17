import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostSummary } from '../../../model/invoice_sum_cost.model';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-table.component.html',
})
export class SummaryTableComponent {
  @Input() summaries: CostSummary[] = [];
}
