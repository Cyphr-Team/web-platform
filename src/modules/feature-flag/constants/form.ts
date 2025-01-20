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

const toggleFeatureFlagFormSchema = z.object({
  author: z.string().min(1, "Author is required"),
  msg: z.string().min(1, "Reason for change is required")
})

export type ToggleFeatureFlagFormValue = z.infer<
  typeof toggleFeatureFlagFormSchema
>

export type WhitelistFormValue = z.infer<typeof whitelistFormSchema>
