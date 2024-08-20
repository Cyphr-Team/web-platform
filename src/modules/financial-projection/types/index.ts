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
