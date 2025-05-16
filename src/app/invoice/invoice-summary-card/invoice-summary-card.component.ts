import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InvoiceCostSummary } from '../../../model/invoice-cost-summary.model';

@Component({
  selector: 'app-invoice-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-summary-card.component.html',
  styleUrls: ['./invoice-summary-card.component.css']  // styleUrl ➜ styleUrls (többes szám!)
})
export class InvoiceSummaryCardComponent {
  @Input() summary!: InvoiceCostSummary;
}
