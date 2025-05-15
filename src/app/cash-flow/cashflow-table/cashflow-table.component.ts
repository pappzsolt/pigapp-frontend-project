import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Cashflow } from '../../../model/cashflow'; // Ellenőrizd az útvonalat!

@Component({
  selector: 'app-cashflow-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cashflow-table.component.html',
})
export class CashflowTableComponent {
  @Input() cashflows$!: Observable<Cashflow[]>;
}
