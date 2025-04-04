import {
  type ApplicationCriteriaResponse,
  type ApplicationScoreResponse
} from "@/modules/loan-application/constants/type.ts"

interface ApplicationCriteria<T = ApplicationCriteriaResponse> {
  businessAge: T
  annualRevenue: T
  profitability: T
  creditScore: T
  cashFlowStability: T
  debtToIncomeRatio: T
  industryRisk: T
  loanAmount: T
  employeeCount: T
  existingLoans: T
}

interface LoanReadiness {
  criteria?: Partial<ApplicationCriteria>
  applicationScore?: ApplicationScoreResponse
}

export type { LoanReadiness }
