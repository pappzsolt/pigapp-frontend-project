export interface Invoice {
  id: number;
  invoice_name: string;
}

export interface Dev {
  id: number;
  dev_name: string;
}

export interface CostRepeat {
  id: number;
  cost_repeat_name: string;
}

export interface CostGroup {
  id: number;
  cost_group_name: string;
}

export interface CashFlowGroup {
  id: number;
  cash_flow_group_name: string;
}

export interface ForeignKeyData {
  invoices: Invoice[];
  devs: Dev[];
  costrepeats: CostRepeat[];
  costgroups: CostGroup[];
  cashflowgroup: CashFlowGroup[];
}
