import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCost } from '../../../model/cost';

@Component({
  selector: 'app-cost-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cost-transform-table.component.html',
  styleUrls: ['./cost-transform-table.component.css'], // ha szükséges
})
export class CostTableComponent {
  @Input() costs: AutoCost[] = [];
  @Input() disabledIds: number[] = [];
  @Output() selectionChange = new EventEmitter<number[]>();

  toggleSelection(cost: AutoCost): void {
    cost.selected = !cost.selected;
    this.emitSelected();
  }

  emitSelected(): void {
    const selectedIds = this.costs.filter(c => c.selected).map(c => c.id);
    this.selectionChange.emit(selectedIds);
  }

  selectAll(): void {
    this.costs.forEach(cost => (cost.selected = true));
    this.emitSelected();
  }

  deselectAll(): void {
    this.costs.forEach(cost => (cost.selected = false));
    this.emitSelected();
  }

  isDisabled(id: number): boolean {
    return this.disabledIds.includes(id);
  }
}
