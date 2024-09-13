import * as z from "zod"

export type ExpenseTaxRateFormValue = z.infer<typeof taxRatesFormSchema>

export const taxRatesFormSchema = z.object({
  id: z.string().nullable(),
  incomeTaxRate: z.coerce.number().min(0).max(100)
})
