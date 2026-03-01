export interface CostPast {
  id: number;
  cost_name: string;
  cost_note: string;
  amount: number;
  cost_date: string;
  paid: number;
  paid_date: string;
  create_cost_date: string;

  invoice: number;
  dev: number;
  costrepeat: number | null;
  costgroup: number;
  user: number | null;
}
