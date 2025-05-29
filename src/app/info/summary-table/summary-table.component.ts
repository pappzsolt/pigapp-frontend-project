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
}
