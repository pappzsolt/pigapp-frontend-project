import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CostRepeatService } from '../services/cost-repeat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CostRepeat } from '../../model/costrepeat';
import { CostRepeatFormComponent } from './cost-repeat-form/cost-repeat-form.component';
import { CostRepeatListComponent } from './cost-repeat-list/cost-repeat-list.component';
import { StyledInputDirective } from '../shared/directives/styled-input.directive';
@Component({
  selector: 'app-cost-repeat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CostRepeatFormComponent,
    CostRepeatListComponent,
    StyledInputDirective,
  ],
  templateUrl: './cost-repeat.component.html',
  styleUrl: './cost-repeat.component.css',
})
export class CostRepeatComponent implements OnInit {
  costRepeatForm!: FormGroup;
  isEditMode = false;
  costRepeatId!: number;
  costRepeat: CostRepeat[] = [];
  costsRepeatList: CostRepeat[] = [];

  constructor(
    private fb: FormBuilder,
    private costRepeatService: CostRepeatService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.costRepeatForm = this.fb.group({
      cost_repeat_name: [''],
      cost_repeat_note: [''],
      amount: [0],
      cost_repeat_date: [''],
      paid: [0],
      paid_date: [''],
      expire_date: [''],
      user: [null],
    });
    this.loadCostRepeats();
  }
  onSubmit(): void {
    if (this.costRepeatForm.valid) {
      const newCostRepeat: CostRepeat = this.costRepeatForm.value;
      newCostRepeat.user = this.authService.getUserId();
      newCostRepeat.create_cost_repeat_date = new Date();
      this.costRepeatService.create(newCostRepeat).subscribe(
        data => {
          this.costRepeat.push(data);
          this.costRepeatForm.reset(); // űrlap törlése
        },
        error => {
          console.error('Hiba a költség hozzáadásakor:', error);
        }
      );
    }
  }

  loadCostRepeats(): void {
    this.costRepeatService.getCostRepeats().subscribe(
      (data: CostRepeat[]) => {
        this.costsRepeatList = data;
      },
      error => {
        console.error('Hiba történt a költségek lekérése során:', error);
      }
    );
  }
}
