import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cost-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cost-filter.component.html',
  styleUrls: ['./cost-filter.component.css'],
})
export class CostFilterComponent {
  @Input() searchDate: string = '';
  @Output() filter = new EventEmitter<string>();

  onFilter(): void {
    this.filter.emit(this.searchDate);
  }
}

