import { isCapitalCollab, isKccBank, isLoanReady } from "@/utils/domain.utils"
import { z } from "zod"

export const defaultLoanRequestFormSchema = z.object({
  id: z.string().optional(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan must not be empty" })
    .optional(),
  // TODO: Remove this field when roll out
  loanTermInMonth: z.number().gt(0).optional(),
  applicationId: z.string()
})

export const loanReadyLoanRequestFormSchema = z.object({
  id: z.string().optional(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string()
})

export const capitalCollabLoanRequestFormSchema = z.object({
  id: z.string().optional(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string()
})

export const kccLoanRequestFormSchema = z.object({
  id: z.string().optional(),
  loanAmount: z.number().gt(0),
  applicationId: z.string()
})

export type DefaultLoanRequestFormValue = z.infer<
  typeof defaultLoanRequestFormSchema
>

export type KccLoanRequestFormValue = z.infer<typeof kccLoanRequestFormSchema>

export type LoanReadyLoanRequestFormValue = z.infer<
  typeof loanReadyLoanRequestFormSchema
>

export type CapitalCollabLoanRequestFormValue = z.infer<
  typeof capitalCollabLoanRequestFormSchema
>

type LoanRequestFormSchema =
  | typeof defaultLoanRequestFormSchema
  | typeof kccLoanRequestFormSchema
  | typeof loanReadyLoanRequestFormSchema
  | typeof capitalCollabLoanRequestFormSchema

export const loanRequestSchemasByInstitution = (): LoanRequestFormSchema => {
  switch (true) {
    case isKccBank():
      return kccLoanRequestFormSchema
    case isLoanReady():
      return loanReadyLoanRequestFormSchema
    case isCapitalCollab():
      return capitalCollabLoanRequestFormSchema
    default:
      return defaultLoanRequestFormSchema
  }
}
