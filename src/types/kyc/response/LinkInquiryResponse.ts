import { EDecisionStatus, EPersonaStatus } from ".."

interface ILinkInquiryData {
  id?: string
  inquiryId?: string
  referenceId?: string
  institutionId?: string
  personaStatus?: EPersonaStatus
  decisionStatus?: EDecisionStatus
  createdAt?: string
  updatedAt?: string
  expiredAt?: string
}

interface ILinkInquiryResponse {
  success?: boolean
  data?: ILinkInquiryData
}

export type { ILinkInquiryResponse }
