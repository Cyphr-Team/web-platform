import { UseOfLoan } from "@/types/loan-application.type"
import { LoanApplicationsKyb } from "../type"
import { LoanApplicationsKyc } from "./kyc"
import { MiddeskStatus } from "./middesk.type"
import {
  ConfirmationFormResponse,
  CurrentLoansInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  OperatingExpensesInformationResponse
} from "@/modules/loan-application/constants/type"

enum SummaryCollectStatus {
  UNKNOWN = "UNKNOWN",
  COLLECTED = "COLLECTED",
  UNCOLLECTED = "UNCOLLECTED",
  UNCHECKED = "UNCHECKED"
}

export { SummaryCollectStatus }

type SummaryCashFlowDocumentation = {
  value?: string
  verification?: MiddeskStatus
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
  currentLoanForm?: CurrentLoansInformationResponse
  operatingExpensesForm?: OperatingExpensesInformationResponse
  confirmationForm?: ConfirmationFormResponse
} & Pick<LoanApplicationsKyc, "personalInfo" | "idCheck" | "checkLists">

export type { LoanSummary }
