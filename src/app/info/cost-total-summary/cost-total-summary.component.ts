import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-total-summary.component.html',
})
export class TotalSummaryComponent {
  @Input() totalPaid: number = 0;
  @Input() totalUnpaid: number = 0;
  @Input() loading: boolean = true;
  @Input() show: boolean = false;
}
