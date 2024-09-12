import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, custom, infer as zodInfer, object, string } from "zod"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

export const byLawFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional(),
  notHaveDoc: boolean().optional()
})

export type ByLawsFormValue = zodInfer<typeof byLawFormSchema>

export const ByLawsForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="By Laws"
      description="If you are a Corporation, please upload your By-Laws. If you are not, please select the checkbox below indicating that you are not a Corporation."
      schema={byLawFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.BY_LAWS}
      hasCheckbox
      checkboxLabel="I am not a Corporation so I don’t need to upload By-Laws."
    />
  )
}
