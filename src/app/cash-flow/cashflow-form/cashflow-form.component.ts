import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cash-flow-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cashflow-form.component.html',
})
export class CashflowFormComponent {
  @Input() cashFlowForm!: FormGroup;
  @Input() invoices: any[] = [];
  @Input() devs: any[] = [];
  @Input() cashFlowGroups: any[] = [];

  @Output() submit = new EventEmitter<void>();

  submitForm(): void {
    this.submit.emit();
  }
}


