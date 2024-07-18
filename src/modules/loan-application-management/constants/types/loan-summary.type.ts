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
import { InsightStatus } from "./insight.type"

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
  confirmationForm?: ConfirmationFormResponse
} & Pick<LoanApplicationsKyc, "personalInfo" | "idCheck" | "checkLists">

export type { LoanSummary }
