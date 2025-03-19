import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { DocumentUploadFormV2Template } from "@/modules/loan-application/components/templates/DocumentUploadFormV2Template.tsx"
import { DocumentUploadFormTemplate } from "@/modules/loan-application/components/templates/DocumentUploadFormTemplate.tsx"
import type { DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import type { ZodObject, ZodTypeAny } from "zod"
import type { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

type BaseFormValue = string | File[] | DocumentUploadedResponse[] | boolean

type BaseUploadFormSchema = ZodObject<
  Record<string, ZodTypeAny>,
  "strip",
  ZodTypeAny,
  Record<string, BaseFormValue>,
  Record<string, BaseFormValue>
>

interface DocumentUploadFormTemplateProps {
  title: string
  description: string
  hasCheckbox?: boolean
  checkboxLabel?: string
  schema: BaseUploadFormSchema
  specificStep: LOAN_APPLICATION_STEPS
  isMultiple?: false
}

// TODO - Form V2 - Remove the whole file
export function UploadDocumentVersionFactory(
  props: DocumentUploadFormTemplateProps
) {
  if (isEnableFormV2()) {
    return <DocumentUploadFormV2Template {...props} />
  }

  return <DocumentUploadFormTemplate {...props} />
}
