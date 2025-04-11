import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { HomeComponent } from './home/home.component';
import { CostComponent } from './cost/cost.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'cashflow', component: CashFlowComponent },
  { path: 'cost', component: CostComponent }
];
