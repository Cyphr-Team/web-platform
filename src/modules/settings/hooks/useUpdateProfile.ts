import * as z from "zod"
import { NAME_REGEX } from "@/constants/regex.constants.ts"

export const updateProfileFormSchema = z.object({
  avatar: z.string().url(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be at most 255 characters")
    .regex(NAME_REGEX, "Please enter a valid name.")
})

export type UpdateProfileFormValue = z.infer<typeof updateProfileFormSchema>
