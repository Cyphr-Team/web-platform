import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { custom, infer as zodInfer, object, string } from "zod"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

export const businessEinLetterFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional()
})

export type BusinessEinLetterFormValue = zodInfer<
  typeof businessEinLetterFormSchema
>

export const BusinessEinLetterForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="Business EIN Letter"
      description="Please upload a copy of your Business EIN Letter"
      schema={businessEinLetterFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER}
    />
  )
}
