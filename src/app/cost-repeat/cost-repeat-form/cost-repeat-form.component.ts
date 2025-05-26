import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TailwindStyledSelectDirective } from '../../shared/directives/tailwind-styled-select.directive';
import { StyledInputDirective } from '../../shared/directives/styled-input.directive';
@Component({
  selector: 'app-cost-repeat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TailwindStyledSelectDirective,StyledInputDirective],
  templateUrl: './cost-repeat-form.component.html',
})
export class CostRepeatFormComponent {
  @Input() costRepeatForm!: FormGroup;
  @Input() isEditMode = false;
  @Output() formSubmit = new EventEmitter<void>();
}
