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

export interface OutgoingByIbanTransaction {
  date: string;
  amount: number;
  balance: number;
  description: string;
}

export interface OutgoingByIbanEntry {
  partner: string;
  total_amount: number;
  transactions: OutgoingByIbanTransaction[];
}

export interface OutgoingByIban {
  [iban: string]: OutgoingByIbanEntry;
}

export interface DailySpending {
  [isoDate: string]: number; // pl. "2025-10-01": -9290
}

export interface InternalTransferTransaction {
  date: string;
  amount: number;
  balance: number;
  description: string;
}

export interface InternalTransfers {
  total: number;
  transactions: InternalTransferTransaction[];
}

/**
 * Itt volt a TS2411 hiba → az index signature-t módosítottuk
 * number | undefined-re.
 */
export interface CategoryTotals {
  [category: string]: number | undefined;
  atm?: number;
  food?: number;
  other?: number;
  services?: number;
  transfer?: number;
  transport?: number;
}

export interface BankStatement {
  all_transactions: Transaction[];
  outgoing_by_iban: OutgoingByIban;
  daily_spending: DailySpending;
  internal_transfers: InternalTransfers;
  category_totals: CategoryTotals;
}

/**
 * A backend válasza a példád alapján:
 * {
 *   "Statement_PDF_...2025.11.01": { ...BankStatement... },
 *   "Statement_PDF_...2025.12.01": { ...BankStatement... }
 * }
 */
export interface BankStatementMap {
  [statementId: string]: BankStatement;
}

/** Segéd típus listanézethez */
export interface BankStatementItem {
  id: string;
  data: BankStatement;
}
