export interface CostRepeatDetail {
  costrepeat_id: number;
  costrepeat_name: string;
  total_amount: number;
}

export interface InvoiceCostSummary {
  invoice_id: number;
  invoice_name: string;
  total_invoice_amount: number;
  details: CostRepeatDetail[];
}
