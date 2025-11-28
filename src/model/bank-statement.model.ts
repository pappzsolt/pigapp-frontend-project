// src/app/model/bank-statement.model.ts

// Egyetlen tranzakció a kivonatban
export interface Transaction {
  konyvelesi_datum: string;
  leiras: string;
  osszeg: number;
  egyenleg: number;

  partner: string;
  iban: string;
  extra_sor_1: string;
  extra_sor_2: string;
  account_number: string;
  other_party_name: string;
  comment: string;
  category: string;

  card_bin: string;
  card_last4: string;
  card_masked: string;
  card_tx_date: string;
  card_tx_time: string;
  card_original_amount: number | null;
  card_currency: string;
  mcc: string;
  pos_id: string;
  card_city: string;
  card_merchant: string;
}

// ----- outgoing_by_iban -----

export interface OutgoingByIbanTransaction {
  date: string;
  amount: number;
  balance: number;
  description: string;
}

export interface OutgoingByIban {
  partner: string;
  total_amount: number;
  transactions: OutgoingByIbanTransaction[];
}

// View-model a template-hez (hozzátesszük az IBAN-t is)
export interface OutgoingByIbanItem {
  iban: string;
  partner: string;
  total_amount: number;
  transactions: OutgoingByIbanTransaction[];
}

// ----- internal_transfers -----

export interface InternalTransferTransaction {
  date: string;
  amount: number;
  balance: number;
  description: string;
}

export interface InternalTransfersSummary {
  total: number;
  transactions: InternalTransferTransaction[];
}

// ----- category_totals -----

export type CategoryTotals = Record<string, number>;

export interface CategoryTotalItem {
  category: string;
  amount: number;
}

// ----- daily_spending -----

export type DailySpendingMap = Record<string, number>;

// ----- fő BankStatement -----

export interface BankStatement {
  all_transactions: Transaction[];

  outgoing_by_iban: {
    [iban: string]: OutgoingByIban;
  };

  daily_spending: DailySpendingMap;

  internal_transfers: InternalTransfersSummary;

  category_totals: CategoryTotals;
}

// Backend map: { "Statement_PDF_...": BankStatement }
export type BankStatementMap = Record<string, BankStatement>;

// Lista nézethez: { id, data }
export interface BankStatementItem {
  id: string;
  data: BankStatement;
}
