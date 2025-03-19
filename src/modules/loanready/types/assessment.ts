import type { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { type LoanApplicationStatus } from "@/types/loan-application.type.ts"
import type { RatingLevel } from "@/modules/assessment/interface/Rating/type.ts"
import type { LoanType } from "@/types/loan-program.type.ts"
import * as z from "zod"

export const loanReadyAssessmentFilterSchema = z.object({
  scores: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  statuses: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  plans: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  createdOn: z.date().optional(),
  submittedOn: z.date().optional()
})

export type LoanReadyAssessmentFilterValues = z.infer<
  typeof loanReadyAssessmentFilterSchema
>

export interface AssessmentResponse {
  id: string
  applicationIdNumber: number
  businessName?: string
  plan?: LoanReadyPlanEnum
  email: string
  requestedLoanAmount?: number

  createdAt: string
  submittedAt?: string
  status: LoanApplicationStatus

  scoreLevel?: RatingLevel
  loanProgramId: string
  programType: LoanType
}
