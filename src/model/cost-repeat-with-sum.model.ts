export interface CostRepeatWithSum {
  total_amount: number;
  cost_repeat_name: string;
  cost_repeat_note: string;
  amount: number;
  cost_repeat_date: string; // ISO dátum string
  paid: number;
  cost_count: number;
  paid_date: string;
  expire_date: string;
  create_cost_repeat_date: string;
  user: number;
}
