import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, custom, type infer as zodInfer, object, string } from "zod"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { UploadDocumentVersionFactory } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/UploadDocumentVersionFactory.tsx"

export const fictitiousNameCertificationFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  deleteFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional(),
  notHaveDoc: boolean().optional()
})

export type FictitiousNameCertificationFormValue = zodInfer<
  typeof fictitiousNameCertificationFormSchema
>

export function FictitiousNameCertificationForm() {
  return (
    <UploadDocumentVersionFactory
      hasCheckbox
      checkboxLabel="I am not operating my business using a Fictitious Business Name so I don't need to upload a Fictitious Name Certification."
      description="If your business will be operating under a DBA (Doing Business As) or Fictitious Business Name, please upload your Fictitious Name Certification. If not, please select the checkbox below indicating you will not be using a Fictitious Business Name for your business."
      schema={fictitiousNameCertificationFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION}
      title="Fictitious Name Certification"
    />
  )
}
