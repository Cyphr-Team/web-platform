import { z } from "zod"

export const DefaultLoanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  loanTermInMonth: z.number().gt(1),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string().optional()
})

export const KccLoanRequestFormSchemas = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  loanTermInMonth: z.number().gt(1),
  applicationId: z.string().optional()
})

export type DefaultLoanRequestFormValue = z.infer<
  typeof DefaultLoanRequestFormSchema
>

export type KccLoanRequestFormValue = z.infer<typeof KccLoanRequestFormSchemas>
