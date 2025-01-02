import { LoanApplicationStatus } from "@/types/loan-application.type.ts"

export const getBadgeVariantByStatus = (status?: LoanApplicationStatus) => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case LoanApplicationStatus.SUBMITTED:
      return "submitted"
    case LoanApplicationStatus.READY_FOR_REVIEW:
      return "blue"
    case LoanApplicationStatus.IN_REVIEW:
      return "inReview"
    case LoanApplicationStatus.CCC_APPLICATION_MISSING_INFO:
      return "missingInformation"
    case LoanApplicationStatus.CCC_READY_FOR_UNDERWRITING:
      return "readyForUnderwriting"
    case LoanApplicationStatus.CCC_UNDERWRITING:
      return "underwriting"
    case LoanApplicationStatus.CCC_APPROVED:
      return "approved"
    case LoanApplicationStatus.CCC_DECLINED:
      return "declined"
    case LoanApplicationStatus.CCC_AGREEMENT_REQUESTED:
      return "agreementRequested"
    case LoanApplicationStatus.CCC_AGREEMENT_SENT:
      return "agreementSent"
    case LoanApplicationStatus.CCC_AGREEMENT_SIGNED:
      return "agreementSigned"
    case LoanApplicationStatus.CCC_FUNDED:
      return "funded"
    default:
      return undefined
  }
}

export const getStatusDisplayName = (
  status?: LoanApplicationStatus
): string => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case LoanApplicationStatus.DRAFT:
      return "Draft"
    case LoanApplicationStatus.SUBMITTED:
      return "Submitted"
    case LoanApplicationStatus.READY_FOR_REVIEW:
      return "Ready for Review"
    case LoanApplicationStatus.IN_REVIEW:
      return "Application In Review"
    case LoanApplicationStatus.CCC_APPLICATION_MISSING_INFO:
      return "Application Missing Info"
    case LoanApplicationStatus.CCC_READY_FOR_UNDERWRITING:
      return "Ready for Underwriting"
    case LoanApplicationStatus.CCC_UNDERWRITING:
      return "Underwriting"
    case LoanApplicationStatus.CCC_APPROVED:
      return "Approved"
    case LoanApplicationStatus.CCC_DECLINED:
      return "Declined"
    case LoanApplicationStatus.CCC_AGREEMENT_REQUESTED:
      return "Agreement Requested"
    case LoanApplicationStatus.CCC_AGREEMENT_SENT:
      return "Agreement Sent"
    case LoanApplicationStatus.CCC_AGREEMENT_SIGNED:
      return "Agreement Signed"
    case LoanApplicationStatus.CCC_FUNDED:
      return "Funded"
    default:
      return "Unknown"
  }
}

export const changeableStatuses: LoanApplicationStatus[] = [
  LoanApplicationStatus.IN_REVIEW,
  LoanApplicationStatus.CCC_APPLICATION_MISSING_INFO,
  LoanApplicationStatus.CCC_READY_FOR_UNDERWRITING,
  LoanApplicationStatus.CCC_UNDERWRITING,
  LoanApplicationStatus.CCC_APPROVED,
  LoanApplicationStatus.CCC_DECLINED,
  LoanApplicationStatus.CCC_AGREEMENT_REQUESTED,
  LoanApplicationStatus.CCC_AGREEMENT_SENT,
  LoanApplicationStatus.CCC_AGREEMENT_SIGNED,
  LoanApplicationStatus.CCC_FUNDED
]

export const allStatuses: LoanApplicationStatus[] = [
  LoanApplicationStatus.DRAFT,
  LoanApplicationStatus.SUBMITTED,
  LoanApplicationStatus.READY_FOR_REVIEW,
  ...changeableStatuses
]

export const isAbleToChangeStatus = (
  status: LoanApplicationStatus
): boolean => {
  return ![
    LoanApplicationStatus.DRAFT,
    LoanApplicationStatus.SUBMITTED,
    LoanApplicationStatus.READY_FOR_REVIEW,
    LoanApplicationStatus.UNKNOWN
  ].includes(status)
}
