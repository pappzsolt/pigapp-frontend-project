export class Cost {
  constructor(
    public id: number,
    public cost_name: string,
    public cost_note: string,
    public amount: number,
    public cost_date: Date,
    public invoice: number,
    public dev: number,
    public costrepeat: number,
    public costgroup: number,
    public paid: number,
    public paid_date: Date,
    public create_cost_date: Date,
    public user: number
  ) {}
}

export interface AutoCost {
  id: number;
  cost_name: string;
  cost_date: string; // ISO string (pl. '2025-04-05')
  amount: number;
  invoice_name: string;
  paid: boolean; // A fizetett állapot
  selected?: boolean; // A kiválasztás állapota
}

export interface MonthlyCostResponse {
  success: boolean;
  message: string;
  data: AutoCost[];
}
export interface UpcomingCost {
  id: number;
  cost_name: string;
  cost_note: string;
  amount: number;
  cost_date: string;
  invoice: number;
  dev: number;
  costgroup: number;
  paid: number;
  paid_date: string;
  create_cost_date: string;
  user: number;
}
