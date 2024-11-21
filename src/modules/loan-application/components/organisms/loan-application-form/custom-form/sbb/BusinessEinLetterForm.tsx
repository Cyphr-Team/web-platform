import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"
import { custom, type infer as zodInfer, object, string } from "zod"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { UploadDocumentVersionFactory } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/UploadDocumentVersionFactory.tsx"

export const businessEinLetterFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  deleteFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional()
})

export type BusinessEinLetterFormValue = zodInfer<
  typeof businessEinLetterFormSchema
>

export function BusinessEinLetterForm() {
  return (
    <UploadDocumentVersionFactory
      description="Please upload a copy of your Business EIN Letter."
      schema={businessEinLetterFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER}
      title="Business EIN Letter"
    />
  )
}
