export class Cashflow {
  id: number = 0;
  cash_flow_name: string = "";
  cash_flow_note: string = "";
  amount: number = 0;
  cashflowgroup: number =0;
  dev: string = "";
  invoice: string = "";
  user: string = "";
  cash_flow_date: Date = new Date() ;
  create_cash_flow_date: Date = new Date();
}
export interface CashFlow2 {
  id?: number;
  cash_flow_name: string;
  cash_flow_note: string;
  amount: number;
  invoice: number;
  dev: number;
  cashflowgroup: number;
  cash_flow_date: string;
  create_cash_flow_date: Date;
  user?: number;
}
