import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, custom, infer as zodInfer, object } from "zod"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

export const fictitiousNameCertificationFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  notHaveDoc: boolean().optional()
})

export type FictitiousNameCertificationFormValue = zodInfer<
  typeof fictitiousNameCertificationFormSchema
> & {
  formId?: string
}

export const FictitiousNameCertificationForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="Fictitious Name Certification"
      description="If your business will be operating under a DBA (Doing Business As) or Fictitious Business Name, please upload your Fictitious Name Certification. If not, please select the checkbox below indicating you will not be using a Fictitious Business Name for your business."
      schema={fictitiousNameCertificationFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION}
      hasCheckbox
      checkboxLabel="I am not operating my business using a Fictitious Business Name so I don't need to upload a Fictitious Name Certification."
    />
  )
}
