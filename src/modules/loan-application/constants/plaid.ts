import * as z from "zod"

export const plaidFormSchema = z.object({
  institution: z.object({ label: z.string(), value: z.string() }).nullable(),
  routingNumber: z.object({ label: z.string(), value: z.string() }).optional()
})

export type PlaidFormValue = z.infer<typeof plaidFormSchema>
