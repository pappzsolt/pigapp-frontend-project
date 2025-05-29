import { Component, EventEmitter, Input, Output, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputStyleDirective } from '../../shared/directives/input-style/input-style.directive';
import { TailwindStyledSelectDirective } from '../../shared/directives/tailwind-styled-select.directive';
import { StyledInputDirective } from '../../shared/directives/styled-input.directive';
import { ButtonDirective } from '../../shared/directives/button.directive';
interface Field {
  label: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox';
  listName?: 'invoices' | 'devs' | 'costRepeats' | 'costGroups'; // csak ezek lehetnek
}

@Component({
  selector: 'app-cost-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputStyleDirective,
    TailwindStyledSelectDirective,
    StyledInputDirective,
    ButtonDirective,
  ],
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

  fields: Field[] = [
    { label: 'Költség neve', name: 'cost_name', type: 'text' },
    { label: 'Megjegyzés', name: 'cost_note', type: 'text' },
    { label: 'Összeg', name: 'amount', type: 'number' },
    { label: 'Dátum', name: 'cost_date', type: 'date' },
    { label: 'Számla', name: 'invoice', type: 'select', listName: 'invoices' },
    { label: 'Pénznem', name: 'dev', type: 'select', listName: 'devs' },
    { label: 'Ismétlés', name: 'costrepeat', type: 'select', listName: 'costRepeats' },
    { label: 'Költség csoport', name: 'costgroup', type: 'select', listName: 'costGroups' },
    { label: 'Fizetve', name: 'paid', type: 'checkbox' },
    { label: 'Fizetés dátuma', name: 'paid_date', type: 'date' },
  ];

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
    this.costForm.get('paid')?.valueChanges.subscribe(paid => {
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
      this.costForm.get('paid_date')?.disable();
    }
  }

  // A megjelenítendő név a select opcióhoz, pl. invoice_name, dev_name, cost_repeat_name, cost_group_name
  getDisplayName(field: Field, item: any): string {
    if (!field.listName) return '';

    // A listName plurál, eltávolítjuk az utolsó 's'-t és hozzáadjuk '_name'
    // invoice -> invoice_name
    // dev -> dev_name
    // costRepeats -> cost_repeat_name
    // costGroups -> cost_group_name

    // Külön kezeli az egyedi eseteket:
    switch (field.listName) {
      case 'invoices':
        return item.invoice_name || '';
      case 'devs':
        return item.dev_name || '';
      case 'costRepeats':
        return item.cost_repeat_name || '';
      case 'costGroups':
        return item.cost_group_name || '';
      default:
        return '';
    }
  }
  getOptions(listName: string): any[] {
    return (this as any)[listName] ?? [];
  }
}
