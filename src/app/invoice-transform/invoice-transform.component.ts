import { InvoiceOption, InvoiceResponse } from '../../model/invoice';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceTransformService } from '../services/invoice-transform.service';
import { AppConfig, CONFIG_TOKEN } from '../config';
import { ReactiveFormsModule } from '@angular/forms'; // Importáld ezt!
import { CommonModule } from '@angular/common';
import { trigger, transition, animate, style } from '@angular/animations';
import { SummaryCardComponent } from '../shared/summary-card/summary-card.component';
import { TransferMessageComponent } from '../transfer-message/transfer-message.component';
import { AutoCost, CalculateCashData, MonthlyCostResponse } from '../../model/cost';
import { CostTableComponent } from './cost-transform-table/cost-transform-table.component';
import { FormsModule } from '@angular/forms';
import { TailwindStyledTableDirective } from '../shared/directives/tailwind-styled-table.directive';
import { TailwindStyledSelectDirective } from '../shared/directives/tailwind-styled-select.directive';
@Component({
  selector: 'app-invoice-transform',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SummaryCardComponent,
    TransferMessageComponent,
    CostTableComponent,
    TailwindStyledTableDirective,
    TailwindStyledSelectDirective,
  ],
  templateUrl: './invoice-transform.component.html',
  styleUrls: ['./invoice-transform.component.css'],
  animations: [
    // Animáció definíció
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }), // Kezdő állapot
        animate('300ms 200ms', style({ opacity: 1 })), // Animáció
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })), // Elhagyás animációja
      ]),
    ]),
  ],
})
export class InvoiceTransformComponent implements OnInit {
  invoiceOption: InvoiceOption[] = [];
  form: FormGroup;
  autoCosts: AutoCost[] = [];
  disabledCostIds: number[] = [];
  calculateCosts: CalculateCashData | null = null;
  message: string = '';
  isLoading = true;
  error: string | null = null;
  transferMessage: string | null = null;

  summaryCards: {
    icon: string;
    title: string;
    valueKey: keyof CalculateCashData;
    colorClass: string;
  }[] = [
    { icon: '💰', title: 'Összes költség', valueKey: 'total_amount', colorClass: 'text-green-700' },
    {
      icon: '🟢',
      title: 'Utolsó fizetés',
      valueKey: 'latest_cashflow_amount',
      colorClass: 'text-blue-600',
    },
    {
      icon: '🔴',
      title: 'Fizetésből maradék',
      valueKey: 'cashflow_minus_total',
      colorClass: 'text-red-600',
    },
    {
      icon: '🔴',
      title: 'Számlákon lévő maradék',
      valueKey: 'invoice_minus_total',
      colorClass: 'text-red-600',
    },
    {
      icon: '🔴',
      title: 'Számlákon lévő összeg',
      valueKey: 'total_enabled_invoice_amount',
      colorClass: 'text-red-600',
    },
  ];

  constructor(
    private invoiceTransformService: InvoiceTransformService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      szamla1: [null, Validators.required],
      szamla2: [null, Validators.required],
      osszeg: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.invoiceTransformService.getInvoiceOptions().subscribe(
      (data: InvoiceResponse) => {
        if (data && data.results) {
          this.invoiceOption = data.results;
        }
      },
      error => {
        console.error('Error fetching invoice options:', error);
      }
    );
    this.invoiceTransformService.getMonthlyCosts().subscribe({
      next: (response: MonthlyCostResponse) => {
        if (response.success) {
          this.autoCosts = response.data;
          // this.message = response.message;
        } else {
          this.error = response.message;
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Hiba történt az adatok betöltésekor.';
        this.isLoading = false;
      },
    });
  }
  onSubmit(): void {
    this.form.markAllAsTouched(); // 💥 ez beállítja, hogy minden mező validációja azonnal fusson
    if (this.form.valid) {
      const { szamla1, szamla2, osszeg } = this.form.value;
      this.invoiceTransformService.transferAmount(szamla1, szamla2, osszeg).subscribe({
        next: res => {
          this.transferMessage = `✅ ${res.message} Számla 1 új egyenlege: ${res.szamla1.amount}, Számla 2 új egyenlege: ${res.szamla2.amount}`;
          this.form.reset();
          setTimeout(() => {
            this.transferMessage = null;
          }, 9000);
        },
        error: () => {
          this.transferMessage = '❌ Hiba történt az átvezetés során.';
          setTimeout(() => {
            this.transferMessage = null;
          }, 9000);
        },
      });
    } else {
      this.transferMessage = '⚠️ Kérlek, tölts ki minden mezőt!';
      setTimeout(() => {
        this.transferMessage = null;
      }, 9000);
    }
  }
  toggleSelection(cost: AutoCost): void {
    cost.selected = !cost.selected;
  }

  selectedCosts(): number[] {
    const selectedCostIds = this.autoCosts
      .filter(cost => cost.selected) // Csak a kijelölt költségek
      .map(cost => cost.id); // Az id-kat gyűjtjük össze

    return selectedCostIds; // Visszaadjuk a kiválasztott költségek ID-jait
  }

  selectAllCosts(): void {
    this.autoCosts.forEach(cost => (cost.selected = true));
    this.selectedCosts(); // Hívjuk meg a selectedCosts metódust, hogy frissítsük a kijelölt költségeket
  }

  deselectAllCosts(): void {
    this.autoCosts.forEach(cost => (cost.selected = false));
    this.selectedCosts(); // Hívjuk meg a selectedCosts metódust, hogy frissítsük a kijelölt költségeket
  }

  calculateCost(): void {
    const selectedCostIds = this.selectedCosts();

    if (selectedCostIds.length > 0) {
      this.invoiceTransformService.calculateCash(selectedCostIds).subscribe({
        next: response => {
          if (response.success) {
            this.message = response.message;
            this.calculateCosts = response.data; // már típusos objektum
            // this.disabledCostIds = [...this.disabledCostIds, ...selectedCostIds];
          } else {
            this.error = response.message;
          }
        },
        error: () => {
          this.error = 'Hiba történt.';
        },
      });
    } else {
      this.error = 'Nincs kiválasztott költség.';
    }
  }
  isCostDisabled(costId: number): boolean {
    return this.disabledCostIds.includes(costId);
  }
  onCostsSelectionChange(selectedIds: number[]): void {
    console.log('Kiválasztott költségek ID:', selectedIds);
    // Itt dolgozd fel, pl. tárold vagy használd a kalkulációhoz
  }
}
