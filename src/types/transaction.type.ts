import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package"

export interface BaseTransaction {
  id: string
  email: string
  amount: string
  paidOn: string
  transactionStatus: string
}

export interface LoanReadyTransaction extends BaseTransaction {
  product: LoanReadyPlanEnum
  companyName: string
  isEligibleToRefund: boolean
}

export enum RefundStatus {
  PAID = "PAID",
  REQUESTED_REFUND = "REQUESTED_REFUND",
  REFUNDED = "REFUNDED",
  DENIED = "DENIED_REFUND"
}

export enum RefundDecisionStatus {
  APPROVED = "APPROVED",
  DENIED = "DENIED"
}

export const getBadgeVariantByStatus = (status?: RefundStatus) => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case RefundStatus.PAID:
      return "paid"
    case RefundStatus.REQUESTED_REFUND:
      return "requestedRefund"
    case RefundStatus.REFUNDED:
      return "refunded"
    case RefundStatus.DENIED:
      return "denied"
    default:
      return undefined
  }
}

export const getStatusDisplayName = (status?: RefundStatus) => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case RefundStatus.PAID:
      return "Paid"
    case RefundStatus.REQUESTED_REFUND:
      return "Requested Refund"
    case RefundStatus.REFUNDED:
      return "Refunded"
    case RefundStatus.DENIED:
      return "Denied Refund"
    default:
      return "Unknown"
  }
}

export type Transaction = LoanReadyTransaction
