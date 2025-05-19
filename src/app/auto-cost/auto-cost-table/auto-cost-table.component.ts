import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { AutoCost } from '../../../model/cost';
import { AutoCostTableHeaderComponent } from './auto-cost-table-header/auto-cost-table-header.component';
import { AutoCostTableRowComponent } from './auto-cost-table-row/auto-cost-table-row.component';

@Component({
  selector: 'app-auto-cost-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective,
    AutoCostTableHeaderComponent,
    AutoCostTableRowComponent,
  ],
  templateUrl: './auto-cost-table.component.html',
})
export class AutoCostTableComponent {
  @Input() autoCosts: AutoCost[] = [];
  @Input() disabledCostIds: number[] = [];
  @Input() selectedCosts: number[] = [];

  @Output() selectionChange = new EventEmitter<void>();
  @Output() selectAll = new EventEmitter<boolean>();
  @Output() updateDates = new EventEmitter<void>();

  onCheckboxChange(): void {
    this.selectionChange.emit();
  }

  onSetAll(state: boolean): void {
    this.selectAll.emit(state);
  }

  onUpdateDates(): void {
    this.updateDates.emit();
  }
}

