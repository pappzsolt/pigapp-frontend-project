import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { HomeComponent } from './home/home.component';
import { CostComponent } from './cost/cost.component';
import { CostRepeatComponent } from './cost-repeat/cost-repeat.component';
import { InfoComponent } from './info/info.component';
import { InvoiceTransformComponent } from './invoice-transform/invoice-transform.component';
import { AutoCostComponent } from './auto-cost/auto-cost.component';
import { MonthlyCalculationComponent } from './monthly-calculation/monthly-calculation.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { label: 'Home' } },

  { path: 'cashflow', component: CashFlowComponent, data: { label: 'Cashflow' } },
  { path: 'cost', component: CostComponent, data: { label: 'Cost' } },
  { path: 'info', component: InfoComponent, data: { label: 'Info' } },
  { path: 'invoicetransform', component: InvoiceTransformComponent, data: { label: 'Invoice transform' } },
  { path: 'autocost', component: AutoCostComponent, data: { label: 'Auto cost' } },
  { path: 'costrepeat', component: CostRepeatComponent, data: { label: 'Costrepeat' } },
  { path: 'monthlycalc', component: MonthlyCalculationComponent, data: { label: 'Havi kalkuláció' } },
];


