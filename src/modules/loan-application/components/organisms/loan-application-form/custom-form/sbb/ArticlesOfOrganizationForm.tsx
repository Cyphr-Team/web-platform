import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"

import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form.ts"

import { boolean, infer as zodInfer, object } from "zod"

export const articlesOfOrganizationFormSchema = object({
  articlesOfOrganization: ZodFileTypeFactory(["application/pdf"]),
  notLCC: boolean().optional()
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
      loanDocumentState={LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION}
      hasCheckbox
      checkboxLabel="I am not a Limited Liability Company (LLC) so I don’t need to upload Articles of Organization and Operating Agreement."
    />
  )
}
