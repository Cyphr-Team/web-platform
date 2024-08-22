export interface FinancialCompany {
  id: string
  userId: string
  companyName: string
  companyDescription: string
  businessStage: string
  fiscalYearCycle: string
  firstYearOfForecast: string
  lengthOfForecast: string
  monthlyDetail: string
}

export interface FinancialProjection {
  id: string
  companyId: string
  name?: string
}

export interface FinancialScenario {
  id: string
  financialCompanyId: string
  name: string
}

export interface DirectCost {
  id: string
  name: string
  financialProjectId: string
  startingMonth: string
  percentageCost: number
}

export interface TransactionalMarketplaceRevenue {
  id?: string
  financialProjectionId?: string
  newCustomerRate: number
  returnCustomerRate: number
  averageMonthlyTransactionPerCustomer: number
  averageTransactionSize: number
  takeRate: number
}

export interface SaasRevenue {
  id?: string
  financialProjectionId?: string
  totalNewCustomerRate: number
  churnRate: number
  monthlyPrice: number
  startingDate: string
  endDate: string
}

export interface RecurringCharge {
  id?: string
  financialProjectionId?: string
  name: string
  newCustomersMonthly: number // New Customers (Monthly)
  annualChurnRate: number // Annual Churn Rate (percentage)
  annualPrice: number // Annual Price (currency)
  frequencyMonths: number // Frequency (Months)
  upfrontFee: number // Upfront Fee (currency)
  billedSubscriptions: number // Billed Subscriptions (count)
  subscriptionsAvailableForRenewal: number // Subscriptions Available for Renewal (count)
  churnedSubscriptions: number // Churned Subscriptions (count)
  renewedSubscriptions: number // Renewed Subscriptions (count)
  startDate: string
}

export interface ContractRevenue {
  id?: string
  financialProjectionId?: string
  name: string
  monthlyRevenue: number
  startDate: string
  endDate: string
}
