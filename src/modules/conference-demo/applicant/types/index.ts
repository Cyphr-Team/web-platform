import * as z from "zod"
import { object } from "zod"

export const documentFormSchema = object({
  files: z.custom<File[]>().refine(() => {
    // should always true for demo
    return true
  })
})

export interface DocumentFormType {
  files: File[]
}
