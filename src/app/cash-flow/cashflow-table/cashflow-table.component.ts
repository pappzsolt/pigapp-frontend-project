import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Cashflow } from '../../../model/cashflow'; // Ellenőrizd az útvonalat!
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';
@Component({
  selector: 'app-cashflow-table',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective],
  templateUrl: './cashflow-table.component.html',
})
export class CashflowTableComponent {
  @Input() cashflows$!: Observable<Cashflow[]>;
  @Input() title!: string;
}
