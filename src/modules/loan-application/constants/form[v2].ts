import { isKccBank, isLoanReady } from "@/utils/domain.utils"
import { z } from "zod"

export const defaultLoanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan must not be empty" })
    .optional(),
  // TODO: Remove this field when roll out
  loanTermInMonth: z.number().gt(0).optional(),
  applicationId: z.string().min(1)
})

export const loanReadyLoanRequestFormSchema = z.object({
  id: z.string().min(1),
  loanAmount: z.number().gt(0),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string().min(1)
})

export const kccLoanRequestFormSchema = z.object({
  id: z.string().min(1),
  loanAmount: z.number().gt(0),
  applicationId: z.string().min(1)
})

export type DefaultLoanRequestFormValue = z.infer<
  typeof defaultLoanRequestFormSchema
>

export type KccLoanRequestFormValue = z.infer<typeof kccLoanRequestFormSchema>

export const schemasByInstitution = () => {
  switch (true) {
    case isKccBank():
      return kccLoanRequestFormSchema
    case isLoanReady():
      return loanReadyLoanRequestFormSchema
    default:
      return defaultLoanRequestFormSchema
  }
}
