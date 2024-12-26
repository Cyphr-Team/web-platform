import { LoanApplicationStatus } from "@/types/loan-application.type.ts"

export const getBadgeVariantByStatus = (status?: LoanApplicationStatus) => {
  // const statusLowercase = toLower(status)

  switch (status) {
    case LoanApplicationStatus.SUBMITTED:
      return "submitted"
    case LoanApplicationStatus.APPLICATION_IN_REVIEW:
      return "inReview"
    case LoanApplicationStatus.APPLICATION_MISSING_INFORMATION:
      return "missingInformation"
    case LoanApplicationStatus.READY_FOR_UNDERWRITING:
      return "readyForUnderwriting"
    case LoanApplicationStatus.UNDERWRITING:
      return "underwriting"
    case LoanApplicationStatus.APPROVED:
      return "approved"
    case LoanApplicationStatus.DECLINED:
      return "declined"
    case LoanApplicationStatus.AGREEMENT_REQUESTED:
      return "agreementRequested"
    case LoanApplicationStatus.AGREEMENT_SENT:
      return "agreementSent"
    case LoanApplicationStatus.AGREEMENT_SIGNED:
      return "agreementSigned"
    case LoanApplicationStatus.FUNDED:
      return "funded"
    default:
      return undefined
  }
}
