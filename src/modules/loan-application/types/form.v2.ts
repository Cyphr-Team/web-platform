import type { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoobRecord = Record<string, any>

export interface FormV2GetRequest {
  applicationId: string
  formTypes: FORM_TYPE[]
}

export interface FormV2SubmitRequest {
  applicationId: string
  formType: FORM_TYPE
  metadata?: NoobRecord
}

export interface FormV2UpdateRequest {
  formId: string
  formType: FORM_TYPE
  metadata?: NoobRecord
}

export interface FormV2Data {
  id: string
  applicationId: string
  formType: FORM_TYPE
  metadata?: NoobRecord
}

export interface FormV2DataResponse {
  applicationId: string
  forms: FormV2Data[]
}
