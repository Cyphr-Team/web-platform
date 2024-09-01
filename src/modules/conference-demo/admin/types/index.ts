import { DotVariantProps } from "../../../../components/ui/dot"

export enum LoanApplicationStatus {
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  IN_REVIEW = "IN_REVIEW",
  REFER_TO_LOANREADY = "REFER_TO_LOANREADY"
}

const buildDecisionInfo = (
  variantColor: DotVariantProps["variantColor"],
  label: string,
  value: LoanApplicationStatus | null
) => ({
  variantColor,
  label,
  value
})

export const getSelectInfoByDecision = (decision?: LoanApplicationStatus) => {
  switch (decision?.toUpperCase()) {
    case LoanApplicationStatus.APPROVED:
      return buildDecisionInfo(
        "green",
        "Approved",
        LoanApplicationStatus.APPROVED
      )
    case LoanApplicationStatus.DENIED:
      return buildDecisionInfo("red", "Denied", LoanApplicationStatus.DENIED)
    case LoanApplicationStatus.REFER_TO_LOANREADY:
      return buildDecisionInfo(
        "gray",
        "Refer to LoanReady",
        LoanApplicationStatus.REFER_TO_LOANREADY
      )
    case LoanApplicationStatus.IN_REVIEW:
      return buildDecisionInfo(
        "yellow",
        "In Review",
        LoanApplicationStatus.IN_REVIEW
      )
    default:
      return buildDecisionInfo("yellow", "In Review", null)
  }
}
