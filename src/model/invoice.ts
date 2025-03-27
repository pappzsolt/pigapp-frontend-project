export class Invoice {
  id: number = 0;
  invoiceName: string = "";
  invoiceNote: string = "";
  createInvoiceDate: Date = new Date();
  enableInvoice: boolean = false;
  userId: number = 0;
  amount: number = 0;
}
