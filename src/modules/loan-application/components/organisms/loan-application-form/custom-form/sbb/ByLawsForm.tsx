import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"
import { boolean, custom, type infer as zodInfer, object, string } from "zod"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { UploadDocumentVersionFactory } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/UploadDocumentVersionFactory.tsx"

export const byLawFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  deleteFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional(),
  notHaveDoc: boolean().optional()
})

export type ByLawsFormValue = zodInfer<typeof byLawFormSchema>

export function ByLawsForm() {
  return (
    <UploadDocumentVersionFactory
      hasCheckbox
      checkboxLabel="I am not a Corporation so I don’t need to upload By-Laws."
      description="If you are a Corporation, please upload your By-Laws. If you are not, please select the checkbox below indicating that you are not a Corporation."
      schema={byLawFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.BY_LAWS}
      title="By-Laws"
    />
  )
}
