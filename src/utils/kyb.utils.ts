import { type LoanSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type"

/**
 * Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
 * If KYB form has not yet been submitted, return "N/A"
 */
export const getBusinessName = (loanSummary?: LoanSummary) => {
  const businessInfo = loanSummary?.businessInfo

  if (businessInfo?.businessName?.verification) {
    return businessInfo?.businessName?.value ?? "N/A"
  }

  return loanSummary?.kybForm?.businessLegalName ?? "N/A"
}
