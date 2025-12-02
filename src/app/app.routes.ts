import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { label: 'Home' },
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'costrepeatwithsum',
    canActivate: [AuthGuard],
    data: { label: 'Kölcsönök' },
    loadComponent: () =>
      import('./cost-repeat-with-sum/cost-repeat-with-sum.component')
        .then(m => m.CostRepeatWithSumComponent),
  },
  {
    path: 'cashflow',
    canActivate: [AuthGuard],
    data: { label: 'Fizetés/bevételek' },
    loadComponent: () =>
      import('./cash-flow/cash-flow.component')
        .then(m => m.CashFlowComponent),
  },
  {
    path: 'cost',
    canActivate: [AuthGuard],
    data: { label: 'Kiadások' },
    loadComponent: () =>
      import('./cost/cost.component')
        .then(m => m.CostComponent),
  },
  {
    path: 'info',
    canActivate: [AuthGuard],
    data: { label: 'Info' },
    loadComponent: () =>
      import('./info/info.component')
        .then(m => m.InfoComponent),
  },
  {
    path: 'invoicetransform',
    canActivate: [AuthGuard],
    data: { label: 'Számlák közötti átvitel/Kalkuláció' },
    loadComponent: () =>
      import('./invoice-transform/invoice-transform.component')
        .then(m => m.InvoiceTransformComponent),
  },
  {
    path: 'autocost',
    canActivate: [AuthGuard],
    data: { label: 'Kiadások felvitele köv hónapra' },
    loadComponent: () =>
      import('./auto-cost/auto-cost.component')
        .then(m => m.AutoCostComponent),
  },
  {
    path: 'costrepeat',
    canActivate: [AuthGuard],
    data: { label: 'Állandó kiadások' },
    loadComponent: () =>
      import('./cost-repeat/cost-repeat.component')
        .then(m => m.CostRepeatComponent),
  },
  {
    path: 'upcomingcosts',
    canActivate: [AuthGuard],
    data: { label: 'Közelgő kiadások' },
    loadComponent: () =>
      import('./upcoming-costs/upcoming-costs.component')
        .then(m => m.UpcomingCostsComponent),
  },
  {
    path: 'monthlycalc',
    canActivate: [AuthGuard],
    data: { label: 'Havi kalkuláció' },
    loadComponent: () =>
      import('./monthly-calculation/monthly-calculation.component')
        .then(m => m.MonthlyCalculationComponent),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },


];
