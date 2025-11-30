// src/app/models/upcoming-costs.model.ts

export interface UpcomingCostItem {
  id: number;
  cost_name: string;
  cost_note: string;
  cost_date: string;      // ISO dátum string
  amount: number;
  paid: number;
  paid_date: string;      // ISO dátum string
  invoice: number;
  invoice_name: string;
  dev: number;
  dev_name: string;
  costgroup: number;
  costgroup_name: string;
}

export interface UpcomingMonthSummary {
  paid_total: number;
  unpaid_total: number;
}

export interface UpcomingMonthData {
  from: string; // "2025-11-01"
  to: string;   // "2025-11-30"
  paid: UpcomingCostItem[];
  unpaid: UpcomingCostItem[];
  summary: UpcomingMonthSummary;
}

export interface UpcomingCostsResponse {
  success: boolean;
  error: string | null;
  current_month: UpcomingMonthData;
  next_month: UpcomingMonthData;
}
