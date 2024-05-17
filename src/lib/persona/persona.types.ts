enum PersonaStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED"
}

enum SmartKycDecisionStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEED_TO_REVIEW = "NEED_TO_REVIEW"
}

interface SmartKyc {
  id: string
  inquiryId: string
  referenceId: string
  institutionId: string
  personaStatus: PersonaStatus
  decisionStatus?: SmartKycDecisionStatus
  createdAt: string
  updatedAt?: string
  expiredAt?: string
}

export type { SmartKyc }
