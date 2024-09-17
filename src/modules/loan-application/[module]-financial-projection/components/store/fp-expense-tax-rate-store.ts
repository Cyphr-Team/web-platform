import * as z from "zod"

export type ExpenseTaxRateFormValue = z.infer<typeof taxRatesFormSchema>

export const taxRatesFormSchema = z.object({
  applicationId: z.string().optional(),
  incomeTaxRate: z.coerce.number().min(0).max(100)
})

export const enum ExpenseTaxRateField {
  applicationId = "applicationId",
  incomeTaxRate = "incomeTaxRate"
}
