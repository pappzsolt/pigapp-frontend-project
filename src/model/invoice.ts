export class Invoice {
  id: number = 0;
  user: string = '';
  invoice_name: string = '';
  invoice_note: string = '';
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

export interface InvoiceTransferResponse {
  message: string;
  szamla1: { id: number; amount: number };
  szamla2: { id: number; amount: number };
}
export interface TotalAmountInvoice {
  totalAmountInvoice: number;
}

export interface InvoiceSummary {
  invoice: {
    id: number;
    invoice_name: string;
    invoice_note: string;
    create_invoice_date: string; // vagy Date, ha konvertálod
    enable_invoice: number;
    amount: number;
  };
  total_paid: string;
  total_unpaid: string;
}

