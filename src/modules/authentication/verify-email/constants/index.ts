import * as z from "zod"

export const verifyEmailFormSchema = z.object({
  codes: z.array(z.string().min(1, "Code is required"))
})

export type VerifyEmailFormSchema = z.infer<typeof verifyEmailFormSchema>
