/// src/environments/environment.ts

const API_HOST = 'http://127.0.0.1:8000';
const API_BASE = `${API_HOST}/api`;
const PIGAPP_BASE = `${API_BASE}/pigapp_app`;
const PIGAPP_API_BASE = `${PIGAPP_BASE}/api`;

export const environment = {
  production: false,

  // ÚJ mezők, amiket az ApiEndpoints használ
  API_HOST,
  API_BASE,
  PIGAPP_BASE,
  PIGAPP_API_BASE,

  // A RÉGI MEZŐKET MEGHAGYJUK, hogy minden régi kód is működjön
  apiTokenUrl: `${API_BASE}/token/`,
  apiTokenRefreshUrl: `${API_BASE}/token/refresh/`,
  apiMonthlyCostsUrl: `${PIGAPP_API_BASE}/monthly-costs/`,
  apiUpdateCostDatesUrl: `${PIGAPP_BASE}/update-cost-dates/`,
  cashFlowUrlAll: `${PIGAPP_BASE}/list_cash_flow/`,
  cashFlowActual: `${PIGAPP_BASE}/list_cash_flow_last/`,
  cashFlowNew: `${PIGAPP_BASE}/new_cash_flow/`,
  cashFlowGetById: `${PIGAPP_API_BASE}/cashflows/`,
  apiForeignKeyDataUrl: `${PIGAPP_BASE}/foreignkey-data/`,
  apiCreateCostUrl: `${PIGAPP_BASE}/create-cost/`,
  apiCostListUrl: `${PIGAPP_BASE}/cost_list_natur/`,
  apiDetailCostUrl: `${PIGAPP_BASE}/cost-detail/`,
  filterCostUrl: `${PIGAPP_BASE}/actual_day_cost_filter/`,
  apiCostGroupCostUrl: `${PIGAPP_BASE}/costgroup-cost/`,
  apiCurrentMonthCostGroupUrl: `${PIGAPP_BASE}/current-month-costgroup-5/`,
  apiInfoUrl: `${PIGAPP_API_BASE}/cost-summary/`,
  invoiceUrl: `${PIGAPP_BASE}/only_invoice_list/`,
  invoiceSaveUrl: `${PIGAPP_BASE}/only_invoice_detail/`,
  apiInvoiceComboUrl: `${PIGAPP_API_BASE}/invoices/combo/`,
  apiInvoiceUpdateUrl: `${PIGAPP_BASE}/invoice/transfer/`,
  apiCostRepeatCreateUrl: `${PIGAPP_BASE}/new_cost_repeat/`,
  apiCostRepeatGetAllUrl: `${PIGAPP_BASE}/costrepeat_list/`,
  apiAllInvoiceSumAmountUrl: `${PIGAPP_BASE}/all_invoice_sum_amount/`,
  apiOnlyInvoiceListUrl: `${PIGAPP_BASE}/only_invoice_list/`,
  apiCostSummaryWithInvoiceUrl: `${PIGAPP_API_BASE}/cost-summary/`,
  apiInvoiceDetail: `${PIGAPP_BASE}/invoice_detail/`,
  apiCostRepeatInvoiceSummary: `${PIGAPP_API_BASE}/cost-repeat-summary/`,
  apiUpComingUnpaidCostsUrl: `${PIGAPP_API_BASE}/upcoming-unpaid-costs/`,
  apiCalculateCashUrl: `${PIGAPP_BASE}/calculate_cash/`,
  apiUpdateInvoiceAmount: `${PIGAPP_API_BASE}/update-invoice-amount/`,
  apiCostRepeatWithSum: `${PIGAPP_API_BASE}/cost-summary/5/`,
  apiMonthlyCostForeCast: `${PIGAPP_BASE}/monthly-cost-forecast/`,
};
