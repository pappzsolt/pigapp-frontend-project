import { Component, OnInit, Input, inject } from '@angular/core';
import { Cashflow, CashFlowResponse } from '../../model/cashflow';
import { Observable, of } from 'rxjs';
import { CashFlowServiceService } from '../services/cash-flow.service.service';
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
  cashFlowResponse: CashFlowResponse[] = [];
  @Input()
  cashflowIndex!: number;
  @Input()
  cashFlowForm!: FormGroup;

  cashflows$: Observable<Cashflow[]> = of([]);

  cashflowActual$: Observable<Cashflow> = of();

  selectedTab: 'add' | 'actual' | 'archive' = 'add';

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

  selectTab(tab: 'add' | 'actual' | 'archive') {
    this.selectedTab = tab;
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
      const newCashflow: CashFlowResponse = this.cashFlowForm.value;
      newCashflow.create_cash_flow_date = new Date();
      newCashflow.user = this.authService.getUserId();
      this.cashFlowService.create(newCashflow).subscribe(
        data => {
          this.cashFlowResponse.push(data);
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
