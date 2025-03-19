import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"
import { custom, type infer as zodInfer, object, string } from "zod"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { UploadDocumentVersionFactory } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/UploadDocumentVersionFactory.tsx"

export const certificateGoodStandingFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  deleteFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional()
})

export type CertificateGoodStandingFormValue = zodInfer<
  typeof certificateGoodStandingFormSchema
>

export function CertificateGoodStandingForm() {
  return (
    <UploadDocumentVersionFactory
      description="Please upload your Certificate of Good Standing issued by your state's Secretary of State office."
      schema={certificateGoodStandingFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING}
      title="Certificate of Good Standing"
    />
  )
}
