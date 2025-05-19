import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCost } from '../../../../model/cost';

@Component({
  selector: 'app-auto-cost-table-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auto-cost-table-row.component.html',
})
export class AutoCostTableRowComponent {
  @Input() cost!: AutoCost;
  @Input() disabled: boolean = false;
  @Output() checkboxChange = new EventEmitter<void>();

  onCheckboxChange(): void {
    this.checkboxChange.emit();
  }
}

