export class Invoice {
  id: number = 0;
  user: string = "";
  invoice_name: string = "";
  invoice_note: string = "";
  create_invoice_date: Date = new Date();
  enable_invoice: boolean = false;
  amount: number = 0;
}
