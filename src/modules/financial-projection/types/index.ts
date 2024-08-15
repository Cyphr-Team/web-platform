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
