import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-invoice-summary-box',
  templateUrl: './invoice-summary-box.component.html',
  imports: [
    CommonModule,
  ],
  standalone: true,
})
export class InvoiceSummaryBoxComponent {
  @Input() summary: any; // Célszerű itt később típust is definiálni
}

