export const enum RevenueType {
  UNIT_SALES = "unitSales",
  BILLABLE_HOURS = "billableHours",
  RECURRING_CHARGES = "recurringCharges",
  CONTRACTS = "contracts"
}

export interface RevenueStream {
  id?: string
  financialProjectionSetupId: string
  unitSales: UnitSale[]
  billableHours: BillableHour[]
  recurringCharges: RecurringCharge[]
  contracts: Contract[]
}

export const enum RevenueResponseType {
  UNIT_SALES = "revenue_unit_sale",
  BILLABLE_HOURS = "revenue_billable_hour",
  RECURRING_CHARGES = "revenue_recurring_charge",
  CONTRACTS = "revenue_contract"
}

export type SubmitRevenueStreamRequest = RevenueStream

interface Identifiable {
  id: string
  financialProjectionSetupId: string
}

export interface SubmitRevenueStreamItemResponse {
  id: string
  financialProjectionSetupId: string
  formType: RevenueResponseType
  unitSale?: UnitSale & Identifiable
  billableHour?: BillableHour & Identifiable
  recurringCharge?: RecurringCharge & Identifiable
  contract?: Contract & Identifiable
}

export interface SubmitRevenueStreamResponse {
  forms: SubmitRevenueStreamItemResponse[]
}

export interface UnitSale {
  id?: string
  name: string
  estimateMonthlyUnitSales: number | undefined
  estimateMonthlySalesIncreaseRate: number | undefined
  unitPrice: number | undefined
  startDate: string
}

export interface BillableHour {
  id?: string
  name: string
  startDate: string
  monthlyNewCustomers: number | undefined
  monthlyNewCustomerIncreaseRate: number | undefined
  averageMonthlyHourBilledPerCustomer: number | undefined
  hourlyRate: number | undefined
}

export interface RecurringCharge {
  id?: string
  name: string
  startDate: string
  monthlyNewCustomer: number | undefined
  recurringCharge: number | undefined
  frequency: string | number | undefined
  churnRate: number | undefined
  hasUpfrontFee: string | undefined
  upfrontFee: number | undefined
}

export interface Contract {
  id?: string
  name: string
  startDate: string
  endDate: string
  monthlyRevenue: number | undefined
}
