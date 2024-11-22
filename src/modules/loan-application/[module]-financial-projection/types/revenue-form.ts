export const enum RevenueType {
  UnitSales = "unitSales",
  BillableHours = "billableHours",
  RecurringCharges = "recurringCharges",
  Contracts = "contracts"
}

export type RevenueCounterState = {
  [key in RevenueType]: boolean
}

export const initialRevenueCounterState = {
  [RevenueType.UnitSales]: false,
  [RevenueType.RecurringCharges]: false,
  [RevenueType.BillableHours]: false,
  [RevenueType.Contracts]: false
}

export type OnAddItemToField = (
  type: RevenueType,
  data: UnitSale | BillableHour | RecurringCharge | Contract
) => VoidFunction

export interface RevenueStream {
  id?: string
  financialProjectionSetupId: string
  unitSales: UnitSale[]
  billableHours: BillableHour[]
  recurringCharges: RecurringCharge[]
  contracts: Contract[]
}

export const enum RevenueResponseType {
  UnitSales = "revenue_unit_sale",
  BillableHours = "revenue_billable_hour",
  RecurringCharges = "revenue_recurring_charge",
  Contracts = "revenue_contract"
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
