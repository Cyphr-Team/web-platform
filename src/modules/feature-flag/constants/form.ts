import * as z from "zod"

export const whitelistFormSchema = z.object({
  institution: z.object({
    value: z.string().min(1, "Institution id is required"),
    label: z.string().min(1, "Institution name is required")
  }),
  user: z.object({
    value: z.string().min(1, "User id is required"),
    label: z.string().min(1, "User email is required")
  })
})

export type WhitelistFormValue = z.infer<typeof whitelistFormSchema>
