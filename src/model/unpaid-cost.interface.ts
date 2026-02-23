export interface Invoice {
  id: number;
  invoice_name: string;
  invoice_note: string;
  create_invoice_date: string;
  amount: number;
  user: number;
  enable_invoice?: boolean; // optional
}

export interface CostGroup {
  id: number;
  group_name: string;
}

export interface Dev {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
}

export interface UnpaidCost {
  id: number;
  cost_name: string;
  cost_note?: string; // ← hozzáadva, opcionális
  amount: number;
  cost_date: string;
  paid: boolean;
  invoice?: Invoice;
  costgroup?: CostGroup;
  dev?: Dev;
  user?: User;
}

export interface PaginatedUnpaidCostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UnpaidCost[];
}
