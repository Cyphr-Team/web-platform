import { type ListResponse, type PaginateParams } from "@/types/common.type.ts"
import { type LoanApplicationStatus } from "@/types/loan-application.type.ts"
import type { MicroLoanProgramType } from "@/types/loan-program.type.ts"
import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export interface SearchOrderLoanApplicationsFilter {
  plan?: LoanReadyPlanEnum[]
}

export interface SearchOrderLoanApplicationRequest extends PaginateParams {
  filter?: SearchOrderLoanApplicationsFilter
}

export type SearchOrderLoanApplicationResponse =
  ListResponse<OrderLoanApplication>

export interface OrderLoanApplication {
  loanProgram: MicroLoanProgramType
  loanProgramId: string

  id: string
  applicationIdNumber: number
  status: LoanApplicationStatus
  paymentTransactionId: string

  plan?: string
  businessName?: string
  ownerEmail?: string

  createdAt: string
  purchasedAt: string
  submittedAt?: string
  upgradedAt?: string
}
