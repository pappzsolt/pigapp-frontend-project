import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { HomeComponent } from './home/home.component';
import { CostComponent } from './cost/cost.component';
import { CostRepeat } from '../model/costrepeat';
import { CostRepeatComponent } from './cost-repeat/cost-repeat.component';
import { InfoComponent } from './info/info.component';
import { InvoiceTransformComponent } from './invoice-transform/invoice-transform.component';
import { AutoCostComponent } from './auto-cost/auto-cost.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'cashflow', component: CashFlowComponent },
  { path: 'cost', component: CostComponent },
  { path: 'info', component: InfoComponent },
  { path: 'invoicetransform', component: InvoiceTransformComponent },
  { path: 'autocost', component: AutoCostComponent },
  { path: 'costrepeat', component: CostRepeatComponent },
];
