import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cost } from '../../../model/cost';
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';
import { ButtonDirective } from '../../shared/directives/button.directive';
@Component({
  selector: 'app-cost-list-table',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective, ButtonDirective],
  templateUrl: './cost-list-table.component.html',
  styleUrls: ['./cost-list-table.component.css'],
})
export class CostListTableComponent {
  @Input() costs: Cost[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() markPaid = new EventEmitter<Cost>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onMarkAsPaid(cost: Cost): void {
    this.markPaid.emit(cost);
  }
}
