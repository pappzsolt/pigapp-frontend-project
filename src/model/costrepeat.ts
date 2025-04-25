export interface CostRepeat {
  id?: number;
  cost_repeat_name: string;
  cost_repeat_note?: string;
  amount?: number;
  cost_repeat_date: string;
  paid?: number;
  paid_date: string;
  expire_date?: string;
  create_cost_repeat_date?: Date;
  user: number;
}
