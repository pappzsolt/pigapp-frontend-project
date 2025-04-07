import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cashflow } from '../../model/cashflow';
import { HighlightedDirective } from "./../directives/highlighted.directive";
@Component({
  selector: 'app-cash-flow',
  imports: [HighlightedDirective],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.css'
})
export class CashFlowComponent implements OnInit{
  @Input({
    required: true
  })
  cashflow!: Cashflow;
  
  constructor(){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
