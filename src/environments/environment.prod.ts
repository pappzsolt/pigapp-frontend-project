export const environment = {
  production: true,
  apiTokenUrl: 'https://192.168.1.37/api/token/',
  apiTokenRefreshUrl: 'https://192.168.1.37/api/token/refresh/',
  apiMonthlyCostsUrl: 'https://192.168.1.37/api/pigapp_app/api/monthly-costs/',
  apiUpdateCostDatesUrl: 'https://192.168.1.37/api/pigapp_app/update-cost-dates/',
  cashFlowUrlAll: 'https://192.168.1.37/api/pigapp_app/list_cash_flow/',
  cashFlowActual: 'https://192.168.1.37/api/pigapp_app/list_cash_flow_last/',
  cashFlowNew: 'https://192.168.1.37/api/pigapp_app/new_cash_flow/',
  cashFlowGetById: 'https://192.168.1.37/api/pigapp_app/api/cashflows/',
  apiForeignKeyDataUrl: 'https://192.168.1.37/api/pigapp_app/foreignkey-data/',
  apiCreateCostUrl: 'https://192.168.1.37/api/pigapp_app/create-cost/',
  apiCostListUrl: 'https://192.168.1.37/api/pigapp_app/cost_list_natur/',
  apiDetailCostUrl: 'https://192.168.1.37/api/pigapp_app/cost-detail/',
  filterCostUrl: 'https://192.168.1.37/api/pigapp_app/actual_day_cost_filter/',
  apiCostGroupCostUrl: 'https://192.168.1.37/api/pigapp_app/costgroup-cost/',
  apiCurrentMonthCostGroupUrl: 'https://192.168.1.37/api/pigapp_app/current-month-costgroup-5/',
  apiInfoUrl: 'https://192.168.1.37/api/pigapp_app/api/cost-summary/',
  invoiceUrl: 'https://192.168.1.37/api/pigapp_app/only_invoice_list/',
  invoiceSaveUrl: 'https://192.168.1.37/api/pigapp_app/only_invoice_detail/',
  apiInvoiceComboUrl: 'https://192.168.1.37/api/pigapp_app/api/invoices/combo/',
  apiInvoiceUpdateUrl: 'https://192.168.1.37/api/pigapp_app/invoice/transfer/',
  apiCostRepeatCreateUrl: 'https://192.168.1.37/api/pigapp_app/new_cost_repeat/',
  apiCostRepeatGetAllUrl: 'https://192.168.1.37/api/pigapp_app/costrepeat_list/',
  /*MonthlyCalculationComponent url  */
  apiAllInvoiceSumAmountUrl: 'https://192.168.1.37/api/pigapp_app/all_invoice_sum_amount/',
  apiOnlyInvoiceListUrl: 'https://192.168.1.37/api/pigapp_app/only_invoice_list/',
  apiCostSummaryWithInvoiceUrl: 'https://192.168.1.37/api/pigapp_app/api/cost-summary/',
  apiInvoiceDetail: 'https://192.168.1.37/api/pigapp_app/invoice_detail/', //invoice id parameterben kell
  /* CostRepeatInvoiceSummary */
  apiCostRepeatInvoiceSummary: 'https://192.168.1.37/api/pigapp_app/api/cost-repeat-summary/', //invoice id parameterben kell
  apiUpComingUnpaidCostsUrl: 'https://192.168.1.37/api/pigapp_app/api/upcoming-unpaid-costs/',
  /* ezt meg me csnalni, az elküldött cost id at összegezni kell és ki kell vonni a szamlan lévő összegből, annyi maradt a hónapban */
  apiCalculateCashUrl: 'https://192.168.1.37/api/pigapp_app/calculate_cash/',
  apiUpdateInvoiceAmount: 'https://192.168.1.37/api/pigapp_app/api/update-invoice-amount/',
  apiCostRepeatWithSum: 'https://192.168.1.37/api/pigapp_app/api/cost-summary/5/',
  apiMonthlyCostForeCast: 'https://192.168.1.37/api/pigapp_app/monthly-cost-forecast/',
};
