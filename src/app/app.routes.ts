import { Routes } from '@angular/router';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { HomeComponent } from './home/home.component';
import { CostComponent } from './cost/cost.component';
import { CostRepeatComponent } from './cost-repeat/cost-repeat.component';
import { InfoComponent } from './info/info.component';
import { InvoiceTransformComponent } from './invoice-transform/invoice-transform.component';
import { AutoCostComponent } from './auto-cost/auto-cost.component';
import { MonthlyCalculationComponent } from './monthly-calculation/monthly-calculation.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { label: 'Home' } },
  {
    path: 'cashflow',
    component: CashFlowComponent,
    canActivate: [AuthGuard],
    data: { label: 'Fizetés/bevételek' },
  },
  { path: 'cost', component: CostComponent, canActivate: [AuthGuard], data: { label: 'Kiadások' } },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard], data: { label: 'Info' } },
  {
    path: 'invoicetransform',
    component: InvoiceTransformComponent,
    canActivate: [AuthGuard],
    data: { label: 'Számlák közötti átvitel/Kalkuláció' },
  },
  {
    path: 'autocost',
    component: AutoCostComponent,
    canActivate: [AuthGuard],
    data: { label: 'Kiadások felvitele köv hónapra' },
  },
  {
    path: 'costrepeat',
    component: CostRepeatComponent,
    canActivate: [AuthGuard],
    data: { label: 'Állandó kiadások' },
  },
  {
    path: 'monthlycalc',
    component: MonthlyCalculationComponent,
    canActivate: [AuthGuard],
    data: { label: 'Havi kalkuláció' },
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
