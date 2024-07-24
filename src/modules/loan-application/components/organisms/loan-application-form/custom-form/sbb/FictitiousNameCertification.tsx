import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, infer as zodInfer, object } from "zod"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

export const fictitiousNameCertificationFormSchema = object({
  fictitiousNameCertification: ZodFileTypeFactory(["application/pdf"]),
  notSoleProprietor: boolean().optional()
})

export type FictitiousNameCertificationFormValue = zodInfer<
  typeof fictitiousNameCertificationFormSchema
>

export const FictitiousNameCertificationForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="Fictitious Name Cerfitication"
      description="If you are a sole proprietor, please upload your Fictitious Name Certification. If you are not, please select the checkbox below indicating that you are not a sole proprietor."
      schema={fictitiousNameCertificationFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION}
      loanDocumentState={LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION}
      hasCheckbox
      checkboxLabel="I am not a sole proprietor so I don’t need to upload a Fictitious Name Certification"
    />
  )
}
