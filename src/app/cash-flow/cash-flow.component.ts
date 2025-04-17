import { Component, OnInit, Input, EventEmitter, Output, inject } from '@angular/core';
import { Cashflow } from '../../model/cashflow';
import { HighlightedDirective } from "./../directives/highlighted.directive";
import { Observable, of } from 'rxjs';
import { CashFlowServiceService } from '../services/cash-flow.service.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.css'
})
export class CashFlowComponent implements OnInit{


/*   @Input({
    required: true
  })
  cashfLow!: Cashflow; */

  @Input()
  cashflowIndex!: number;

  cashflows$: Observable<Cashflow[]> = of([]);

  cashflowsActual$: Observable<Cashflow[]> = of([]);

  private cashFlowService = inject(CashFlowServiceService);

  constructor(){}


  ngOnInit(): void {
    this.cashflows$ = this.cashFlowService.getCashFlowListAll();
    this.cashflowsActual$ = this.cashFlowService.getCashFlowListActual();
  }
}
