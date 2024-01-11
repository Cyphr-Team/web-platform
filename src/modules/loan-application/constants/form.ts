import * as z from "zod"

export const businessFormSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  website: z.string().url()
})

export type BusinessFormValue = z.infer<typeof businessFormSchema>
