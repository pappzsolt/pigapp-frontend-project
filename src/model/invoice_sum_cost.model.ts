export interface InvoiceSumCost {
  invoice: number;
  amount: number;
}
export interface InvoiceSumCost {
  amount: number;
  get_first_day: string;
  get_last_day: string;
  invoice: number;
}
export interface InvoiceIdWithName {
  id: number;
  invoice_name: string;
}
export interface Invoice {
  id: number;
  invoice_name: string;
  invoice_note: string;
  create_invoice_date: string; // ISO dátum string
  enable_invoice: number;
  amount: number;
}

export interface CostSummary {
  invoice: Invoice;
  total_paid: string; // vagy number, ha parse-olod
  total_unpaid: string; // vagy number, ha parse-olod
}
export interface CostGroupItem {
  costgroup_name: string;
  total_amount: number;
}

export interface FilteredDates {
  current_month_start: string;
  current_month_end: string;
  previous_month_start: string;
  previous_month_end: string;
}

export interface CostGroupResponse {
  filtered_dates: FilteredDates;
  cost_groups: {
    [groupId: string]: CostGroupItem[];
  };
}
export interface CostData {
  id: number;
  cost_name: string;
  cost_note: string;
  amount: number;
  cost_date: string;
  paid: number;
  paid_date: string;
  costgroup_id: number;
}
