export interface InvoiceSumCost {
  invoice: number;
  amount: number;
}
export interface InvoiceSumCost {
  amount: number,
  get_first_day: string,
  get_last_day : string,
  invoice: number
}
export interface InvoiceIdWithName {
  id: number,
  invoice_name: string
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
  total_paid: string;   // vagy number, ha parse-olod
  total_unpaid: string; // vagy number, ha parse-olod
}
