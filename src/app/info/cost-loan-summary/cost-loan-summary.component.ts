import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostData } from '../../../model/invoice_sum_cost.model';

@Component({
  selector: 'app-cost-loan-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-loan-summary.component.html',
})
export class CostLoanSummaryComponent {
  @Input() costData: CostData[] = [];
  @Input() loading = false;
  @Input() error = '';
}
