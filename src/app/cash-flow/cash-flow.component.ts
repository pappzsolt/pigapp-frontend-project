import { Component, OnInit, Input, EventEmitter, Output, inject } from '@angular/core';
import { Cashflow, CashFlow2 } from '../../model/cashflow';
import { HighlightedDirective } from './../directives/highlighted.directive';
import { Observable, of } from 'rxjs';
import { CashFlowServiceService } from '../services/cash-flow.service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.css',
})
export class CashFlowComponent implements OnInit {
  invoices: any[] = [];
  devs: any[] = [];
  cashFlowGroups: any[] = [];
  cashFlows2: CashFlow2[] = [];
  cashFlowForm!: FormGroup;

  @Input()
  cashflowIndex!: number;

  cashflows$: Observable<Cashflow[]> = of([]);

  cashflowActual$: Observable<Cashflow> = of();

  private cashFlowService = inject(CashFlowServiceService);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cashflows$ = this.cashFlowService.getCashFlowListAll();
    this.cashflowActual$ = this.cashFlowService.getCashFlowLast();
    this.loadForeignKeyData();
    this.cashFlowForm = this.fb.group({
      cash_flow_name: ['', Validators.required],
      cash_flow_note: [''],
      amount: [0, Validators.required],
      invoice: [null, Validators.required],
      dev: [null, Validators.required],
      cashflowgroup: [null, Validators.required],
      cash_flow_date: ['', Validators.required],
    });
  }

  loadForeignKeyData(): void {
    this.cashFlowService.getForeignKeyData().subscribe(
      data => {
        this.invoices = data.invoices;
        this.devs = data.devs;
        this.cashFlowGroups = data.cashflowgroup;
      },
      error => {
        console.error('Hiba a ForeignKey adatok betöltésekor:', error);
      }
    );
  }

  addCost(): void {
    if (this.cashFlowForm.valid) {
      const newCashflow: CashFlow2 = this.cashFlowForm.value;
      newCashflow.create_cash_flow_date = new Date();
      newCashflow.user = this.authService.getUserId();
      this.cashFlowService.create(newCashflow).subscribe(
        data => {
          this.cashFlows2.push(data);
          this.cashFlowForm.reset(); // űrlap törlése
        },
        error => {
          console.error('Hiba a költség hozzáadásakor:', error);
        }
      );
    } else {
      console.log('hiba');
      console.log(this.cashFlowForm.value);
    }
  }
}
