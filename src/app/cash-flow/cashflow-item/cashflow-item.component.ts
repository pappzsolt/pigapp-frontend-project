import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cashflow-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-blue-200">
          <th class="px-4 py-2 border-b">Típus</th>
          <th class="px-4 py-2 border-b">Felhasználó</th>
          <th class="px-4 py-2 border-b">Számla</th>
          <th class="px-4 py-2 border-b">Leírás</th>
          <th class="px-4 py-2 border-b">Összeg</th>
          <th class="px-4 py-2 border-b">Dátum</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngIf="item" class="bg-white">
          <td class="px-4 py-2 border-b">{{ item.cashflowgroup }}</td>
          <td class="px-4 py-2 border-b">{{ item.user }}</td>
          <td class="px-4 py-2 border-b">{{ item.invoice }}</td>
          <td class="px-4 py-2 border-b">{{ item.cash_flow_note }}</td>
          <td class="px-4 py-2 border-b font-semibold text-green-700">{{ item.amount }} Ft</td>
          <td class="px-4 py-2 border-b">{{ item.cash_flow_date }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class CashflowItemComponent {
  @Input() item: any;
}

