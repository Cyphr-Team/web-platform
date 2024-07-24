import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { infer as zodInfer, object } from "zod"

export const businessEinLetterFormSchema = object({
  businessEinLetter: ZodFileTypeFactory(["application/pdf"])
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
      loanDocumentState={LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER}
    />
  )
}
