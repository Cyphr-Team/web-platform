import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, custom, infer as zodInfer, object, string } from "zod"
import { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

export const articlesOfOrganizationFormSchema = object({
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional(),
  uploadedFiles: custom<DocumentUploadedResponse[]>().optional(),
  formId: string().optional(),
  notHaveDoc: boolean().optional()
})

export type ArticlesOfOrganizationFormValue = zodInfer<
  typeof articlesOfOrganizationFormSchema
>
export const ArticlesOfOrganizationForm = () => {
  return (
    <DocumentUploadFormTemplate
      title="Articles of Organization and Operating Agreement"
      description="If you are a Limited Liability Company (LLC), please upload your Articles of Organization and Operating Agreement. If you are not, please select the checkbox below indicating that you are not an LLC."
      schema={articlesOfOrganizationFormSchema}
      specificStep={LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION}
      hasCheckbox
      checkboxLabel="I am not a Limited Liability Company (LLC) so I don’t need to upload Articles of Organization and Operating Agreement."
    />
  )
}
