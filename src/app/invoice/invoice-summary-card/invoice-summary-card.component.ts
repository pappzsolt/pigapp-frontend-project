import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InvoiceCostSummary } from '../../../model/invoice-cost-summary.model';
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';
@Component({
  selector: 'app-invoice-summary-card',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective],
  templateUrl: './invoice-summary-card.component.html',
  styleUrls: ['./invoice-summary-card.component.css'], // styleUrl ➜ styleUrls (többes szám!)
})
export class InvoiceSummaryCardComponent {
  @Input() summary!: InvoiceCostSummary;
}
