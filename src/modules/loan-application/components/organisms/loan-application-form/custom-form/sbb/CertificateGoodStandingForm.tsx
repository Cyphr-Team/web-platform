import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { infer as zodInfer, object } from "zod"

export const certificateGoodStandingFormSchema = object({
  certificateGoodStanding: ZodFileTypeFactory(["application/pdf"])
})

export type CertificateGoodStandingFormValue = zodInfer<
  typeof certificateGoodStandingFormSchema
>

export const CertificateGoodStandingForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="Certificate of Good Standing"
      description="Please upload your Certificate of Good Standing issued by your state's Secretary of State office"
      schema={certificateGoodStandingFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING}
      loanDocumentState={LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING}
    />
  )
}
