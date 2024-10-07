import { SmartKyc } from "@/lib/persona/persona.types"
import { QueryForecastingSetupByIdResponse } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup"
import {
  AssetsCurrentFormResponse,
  AssetsLongTermFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import {
  DebtFinancingLiabilityResponse,
  DebtFinancingResponse
} from "@/modules/loan-application/[module]-financial-projection/types/debt-financing"
import { DirectCostsFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"
import { FpEquityFinancingFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import { FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { FpOperatingExpensesFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/operating-expenses-form"
import { ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { SubmitRevenueStreamResponse } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import { ExpenseTaxRateFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { BusinessModelFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/type"
import { LaunchKcFitFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"
import { ExecutionFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/execution/type"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { ProductServiceFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/product-service/type"
import {
  ConfirmationFormResponse,
  CurrentLoanInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  OperatingExpensesInformationResponse,
  PreQualificationResponse
} from "@/modules/loan-application/constants/type"
import { UseOfLoan } from "@/types/loan-application.type"
import { LoanApplicationsKyb } from "../type"
import { InsightStatus } from "./insight.type"
import { LoanApplicationsKyc } from "./kyc"

enum SummaryCollectStatus {
  UNKNOWN = "UNKNOWN",
  COLLECTED = "COLLECTED",
  UNCOLLECTED = "UNCOLLECTED",
  UNCHECKED = "UNCHECKED"
}

export { SummaryCollectStatus }

type SummaryCashFlowDocumentation = {
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

type FinancialApplicationLoanSummary = {
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
