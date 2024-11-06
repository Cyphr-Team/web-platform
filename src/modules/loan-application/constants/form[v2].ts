import { z } from "zod"

export const defaultLoanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string().optional()
})

export const kccLoanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  applicationId: z.string().optional()
})

export const kansasLoanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  requestingInstitution: z.string().optional(),
  applicationId: z.string().optional()
})

export type DefaultLoanRequestFormValue = z.infer<
  typeof defaultLoanRequestFormSchema
>

export type KccLoanRequestFormValue = z.infer<typeof kccLoanRequestFormSchema>

export type KansasLoanRequestFormValue = z.infer<
  typeof kansasLoanRequestFormSchema
>
