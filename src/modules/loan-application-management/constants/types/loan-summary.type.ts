import { UseOfLoan } from "@/types/loan-application.type"
import { LoanApplicationsKyb } from "../type"
import { LoanApplicationsKyc } from "./kyc"
import {
  ConfirmationFormResponse,
  CurrentLoanInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  OperatingExpensesInformationResponse
} from "@/modules/loan-application/constants/type"
import { ProductServiceFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/product-service/type"
import { LaunchKcFitFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/launchkc-fit/type"
import { InsightStatus } from "./insight.type"
import { ExecutionFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/execution/type"
import { BusinessModelFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/type"
import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"

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
  productServiceForm?: ProductServiceFormResponse
  marketOpportunityForm?: MarketOpportunityFormResponse
  launchKCFitForm?: LaunchKcFitFormResponse
  executionForm?: ExecutionFormResponse
  businessModelForm?: BusinessModelFormResponse
  confirmationForm?: ConfirmationFormResponse
} & Pick<LoanApplicationsKyc, "personalInfo" | "idCheck" | "checkLists">

export type { LoanSummary }
