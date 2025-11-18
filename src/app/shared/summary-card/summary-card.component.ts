import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SummaryCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: number;
  @Input() colorClass: string = 'text-gray-800';
}
