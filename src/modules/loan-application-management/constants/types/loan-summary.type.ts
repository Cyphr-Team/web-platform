import { type SmartKyc } from "@/lib/persona/persona.types"
import { type QueryForecastingSetupByIdResponse } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup"
import {
  type AssetsCurrentFormResponse,
  type AssetsLongTermFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import {
  type DebtFinancingLiabilityResponse,
  type DebtFinancingResponse
} from "@/modules/loan-application/[module]-financial-projection/types/debt-financing"
import { type DirectCostsFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"
import { type FpEquityFinancingFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import { type FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { type FpOperatingExpensesFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/operating-expenses-form"
import { type ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { type SubmitRevenueStreamResponse } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import { type ExpenseTaxRateFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { type BusinessModelFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/type"
import { type LaunchKcFitFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"
import { type ExecutionFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/execution/type"
import { type MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { type ProductServiceFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/product-service/type"
import {
  type ConfirmationFormResponse,
  type CurrentLoanInformationResponse,
  type KYBInformationResponse,
  type KYCInformationResponse,
  type LoanRequestFormResponse,
  type OperatingExpensesInformationResponse,
  type PreQualificationResponse
} from "@/modules/loan-application/constants/type"
import { type UseOfLoan } from "@/types/loan-application.type"
import { type LoanApplicationsKyb } from "../type"
import { type InsightStatus } from "./insight.type"
import { type LoanApplicationsKyc } from "./kyc"

enum SummaryCollectStatus {
  UNKNOWN = "UNKNOWN",
  COLLECTED = "COLLECTED",
  UNCOLLECTED = "UNCOLLECTED",
  UNCHECKED = "UNCHECKED"
}

export { SummaryCollectStatus }

interface SummaryCashFlowDocumentation {
  value?: string
  verification?: InsightStatus
}

type LoanSummary = {
  businessInfo: Pick<
    LoanApplicationsKyb,
    "businessName" | "tin" | "formation" | "officeAddresses" | "phoneNumber"
  >
  cashFlowDocumentation?: SummaryCashFlowDocumentation[]
  proposeUseOfLoan?: UseOfLoan
  loanType?: string
  loanRequestForm?: LoanRequestFormResponse
  kybForm?: KYBInformationResponse
  kycForm?: KYCInformationResponse
  currentLoanForms?: CurrentLoanInformationResponse[]
  operatingExpensesForm?: OperatingExpensesInformationResponse
  preQualificationForm?: PreQualificationResponse
  productServiceForm?: ProductServiceFormResponse
  marketOpportunityForm?: MarketOpportunityFormResponse
  launchKCFitForm?: LaunchKcFitFormResponse
  executionForm?: ExecutionFormResponse
  businessModelForm?: BusinessModelFormResponse
  confirmationForm?: ConfirmationFormResponse
  smartKycPersonaDetail?: SmartKyc
} & Pick<LoanApplicationsKyc, "personalInfo" | "idCheck" | "checkLists"> & {
    financialApplicationForm?: FinancialApplicationLoanSummary
  }

interface FinancialApplicationLoanSummary {
  assetCurrentForm?: AssetsCurrentFormResponse
  assetLongTermForm?: AssetsLongTermFormResponse
  debtFinancingForm?: DebtFinancingResponse
  debtFinancingLiabilityForm?: DebtFinancingLiabilityResponse
  directCostForm?: DirectCostsFormResponse
  equityForm?: FpEquityFinancingFormResponse
  expensePeopleForm?: ExpensePeopleResponse
  expenseTaxRateForm?: ExpenseTaxRateFormResponse
  financialProjectionSetupForm?: QueryForecastingSetupByIdResponse
  financialStatementForm?: FinancialStatementFormResponse
  operatingExpenseForm?: FpOperatingExpensesFormResponse
  revenueForm?: SubmitRevenueStreamResponse
}

export type { LoanSummary }
