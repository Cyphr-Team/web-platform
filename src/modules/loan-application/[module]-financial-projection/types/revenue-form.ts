export const enum RevenueType {
  UNIT_SALES = "unitSales",
  BILLABLE_HOURS = "billableHours",
  RECURRING_CHARGES = "recurringCharges",
  CONTRACTS = "contracts"
}

export interface RevenueStream {
  financialProjectionSetupId: string
  unitSales: UnitSale[]
  billableHours: BillableHour[]
  recurringCharges: RecurringCharge[]
  contracts: Contract[]
}

export interface UnitSale {
  name: string
  estimateMonthlyUnitSales: number | undefined
  estimateMonthlySalesIncreaseRate: number | undefined
  unitPrice: number | undefined
  startDate: string
}

export interface BillableHour {
  name: string
  startDate: string
  monthlyNewCustomers: number | undefined
  monthlyNewCustomerIncreaseRate: number | undefined
  averageMonthlyHourBilledPerCustomer: number | undefined
  hourlyRate: number | undefined
}

export interface RecurringCharge {
  name: string
  startDate: string
  monthlyNewCustomer: number | undefined
  recurringCharge: number | undefined
  frequency: string | number | undefined
  churnRate: number | undefined
  upfrontFee: number | undefined
}

export interface Contract {
  name: string
  startDate: string
  endDate: string
  monthlyRevenue: number | undefined
}

export const emptyUnitSale: UnitSale = {
  name: "",
  estimateMonthlyUnitSales: undefined,
  estimateMonthlySalesIncreaseRate: undefined,
  unitPrice: undefined,
  startDate: ""
}

export const emptyBillableHour: BillableHour = {
  name: "",
  startDate: "",
  monthlyNewCustomers: undefined,
  monthlyNewCustomerIncreaseRate: undefined,
  averageMonthlyHourBilledPerCustomer: undefined,
  hourlyRate: undefined
}

export const emptyRecurringCharge: RecurringCharge = {
  name: "",
  startDate: "",
  monthlyNewCustomer: undefined,
  recurringCharge: undefined,
  frequency: undefined,
  churnRate: undefined,
  upfrontFee: undefined
}

export const emptyContract: Contract = {
  name: "",
  startDate: "",
  endDate: "",
  monthlyRevenue: undefined
}
