export class Invoice {
  id: number = 0;
  user: string = "";
  invoice_name: string = "";
  invoice_note: string = "";
  create_invoice_date: Date = new Date();
  enable_invoice: boolean = false;
  amount: number = 0;
}

export interface InvoiceOption {
  id: number;
  invoice_name: string;
}
export interface InvoiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InvoiceOption[];
}
