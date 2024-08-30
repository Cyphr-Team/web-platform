import * as z from "zod"
import { object } from "zod"
import { ACCEPTED_FILE_TYPES } from "@/modules/conference-demo/applicant/constants"

export const documentFormSchema = object({
  files: z.custom<File[]>().refine((files) => {
    if (files?.length) {
      let checkResult = true
      // assert all file type
      files.forEach((file) => {
        checkResult = checkResult && ACCEPTED_FILE_TYPES.includes(file.type)
      })
      return files && checkResult
    }
    return false
  })
})
