import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostGroupResponse } from '../../../model/invoice_sum_cost.model';

@Component({
  selector: 'app-cost-group-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-group-summary.component.html',
})
export class CostGroupSummaryComponent {
  @Input() costGroupResponse!: CostGroupResponse;

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
