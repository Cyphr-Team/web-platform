import * as z from "zod"

export const verifyPhoneFormSchema = z.object({
  codes: z.array(z.string().min(1, "Code is required"))
})

export type VerifyPhoneFormSchema = z.infer<typeof verifyPhoneFormSchema>
