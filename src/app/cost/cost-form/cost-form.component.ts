import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cost-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cost-form.component.html',
  styleUrls: ['./cost-form.component.css'],
})
export class CostFormComponent {
  @Input() invoices: any[] = [];
  @Input() devs: any[] = [];
  @Input() costRepeats: any[] = [];
  @Input() costGroups: any[] = [];

  @Output() formSubmit = new EventEmitter<FormGroup>();

  costForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.costForm = this.fb.group({
      cost_name: ['', Validators.required],
      cost_note: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      cost_date: ['', Validators.required],
      invoice: ['', Validators.required],
      dev: ['', Validators.required],
      costrepeat: ['', Validators.required],
      costgroup: ['', Validators.required],
      paid: [false],
      paid_date: [''],
    });

    // Fizetés dátum engedélyezése csak ha paid true
    this.costForm.get('paid')?.valueChanges.subscribe((paid) => {
      if (paid) {
        this.costForm.get('paid_date')?.setValidators([Validators.required]);
        this.costForm.get('paid_date')?.enable();
      } else {
        this.costForm.get('paid_date')?.clearValidators();
        this.costForm.get('paid_date')?.setValue('');
        this.costForm.get('paid_date')?.disable();
      }
      this.costForm.get('paid_date')?.updateValueAndValidity();
    });

    // Kezdetben disabled, ha paid nem igaz
    if (!this.costForm.get('paid')?.value) {
      this.costForm.get('paid_date')?.disable();
    }
  }

  onSubmit() {
    if (this.costForm.valid) {
      this.formSubmit.emit(this.costForm);
      this.costForm.reset();
      // Reset disabled állapot a paid_date-nek is
      this.costForm.get('paid_date')?.disable();
    }
  }
}

