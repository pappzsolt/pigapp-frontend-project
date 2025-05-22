import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { AutoCost } from '../../../model/cost';
import { AlertMessageComponent } from '../../shared/alert-message/alert-message.component';
@Component({
  selector: 'app-auto-cost-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonDirective, AlertMessageComponent],
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


