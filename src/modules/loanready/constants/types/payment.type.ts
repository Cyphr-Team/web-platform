import { type PaymentGateway } from "@/modules/loanready/constants/payment"
import {
  type TransactionIntent,
  type TransactionOrigin
} from "@/modules/loanready/constants/transaction"
import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package"

export interface PaymentCreateChargeConfirmationTokenRequest {
  amount: number
  confirmationToken: string
  type: LoanReadyPlanEnum
  applicationId?: string
  email?: string
}

export interface PaymentTransactionResponse {
  id: string
  userId: string
  amount: number
  currency: string
  intent: TransactionIntent
  gateway: PaymentGateway
  externalId?: string
  origin?: TransactionOrigin
}
