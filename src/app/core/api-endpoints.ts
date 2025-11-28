// src/app/core/api-endpoints.ts

import { environment } from '../../environments/environment';

const BASE = environment.API_BASE;
const PIGAPP = environment.PIGAPP_BASE;
const PIGAPP_API = environment.PIGAPP_API_BASE;

export const ApiEndpoints = {
  /** Auth / JWT */
  auth: {
    token: `${BASE}/token/`,
    refresh: `${BASE}/token/refresh/`,
  },

  /** Monthly costs + forecast */
  monthly: {
    monthlyCosts: `${PIGAPP_API}/monthly-costs/`,
    updateCostDates: `${PIGAPP}/update-cost-dates/`,
    forecast: `${PIGAPP}/monthly-cost-forecast/`,
  },

  /** CashFlow */
  cashFlow: {
    all: `${PIGAPP}/list_cash_flow/`,
    actual: `${PIGAPP}/list_cash_flow_last/`,
    create: `${PIGAPP}/new_cash_flow/`,
    getById: `${PIGAPP_API}/cashflows/`,
    calculateCash: `${PIGAPP}/calculate_cash/`,
  },

  /** Costs (költségek) */
  costs: {
    foreignKeyData: `${PIGAPP}/foreignkey-data/`,                   // apiForeignKeyDataUrl
    create: `${PIGAPP}/create-cost/`,                               // apiCreateCostUrl
    list: `${PIGAPP}/cost_list_natur/`,                             // apiCostListUrl
    detail: `${PIGAPP}/cost-detail/`,                               // apiDetailCostUrl
    filterActualDay: `${PIGAPP}/actual_day_cost_filter/`,           // filterCostUrl
    groupCost: `${PIGAPP}/costgroup-cost/`,                         // apiCostGroupCostUrl
    currentMonthCostGroup5: `${PIGAPP}/current-month-costgroup-5/`, // apiCurrentMonthCostGroupUrl
    summary: `${PIGAPP_API}/cost-summary/`,                         // apiInfoUrl
    summaryWithInvoice: `${PIGAPP_API}/cost-summary/`,              // apiCostSummaryWithInvoiceUrl (ugyanaz az endpoint, más logika)
    repeatWithSum5: `${PIGAPP_API}/cost-summary/5/`,                // apiCostRepeatWithSum
    upcomingUnpaid: `${PIGAPP_API}/upcoming-unpaid-costs/`,         // apiUpComingUnpaidCostsUrl
  },

  /** Invoices (számlák) */
  invoices: {
    onlyInvoiceList: `${PIGAPP}/only_invoice_list/`,          // invoiceUrl, apiOnlyInvoiceListUrl
    saveInvoiceDetail: `${PIGAPP}/only_invoice_detail/`,      // invoiceSaveUrl
    combo: `${PIGAPP_API}/invoices/combo/`,                   // apiInvoiceComboUrl
    transfer: `${PIGAPP}/invoice/transfer/`,                  // apiInvoiceUpdateUrl
    allInvoiceSumAmount: `${PIGAPP}/all_invoice_sum_amount/`, // apiAllInvoiceSumAmountUrl
    detail: `${PIGAPP}/invoice_detail/`,                      // apiInvoiceDetail
    updateAmount: `${PIGAPP_API}/update-invoice-amount/`,     // apiUpdateInvoiceAmount
  },

  /** CostRepeat (ismétlődő költségek) */
  costRepeat: {
    create: `${PIGAPP}/new_cost_repeat/`,                     // apiCostRepeatCreateUrl
    listAll: `${PIGAPP}/costrepeat_list/`,                    // apiCostRepeatGetAllUrl
    invoiceSummary: `${PIGAPP_API}/cost-repeat-summary/`,     // apiCostRepeatInvoiceSummary
  },

  /** Bank statements (bankkivonatok / CIB parse) */
  bankStatements: {
    /**
     * Lista:
     * http://127.0.0.1:8000/api/pigapp_app/api/cib-parse/
     *
     * => PIGAPP_API + '/cib-parse/'
     */
    list: `${PIGAPP_API}/cib-parse/`,
    // Ha később lesz külön detail endpoint:
    // detail: (id: string | number) => `${PIGAPP_API}/cib-parse/${id}/`,
  },
};

// Példák használatra:
//
// this.http.get(ApiEndpoints.costs.list);
// this.http.post(ApiEndpoints.invoices.saveInvoiceDetail, body);
// this.http.post(ApiEndpoints.auth.token, credentials);
//
// Bankkivonatok / CIB parse lekérése:
// this.http.get(ApiEndpoints.bankStatements.list);
