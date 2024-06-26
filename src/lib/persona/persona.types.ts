enum PersonaStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEED_TO_REVIEW = "NEED_TO_REVIEW"
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
  sessionToken?: string
  behavior?: PersonaInquiryBehavior
  governmentVerifications?: PersonaGovernmentId[]
  selfies?: PersonaSelfie[]
  inquirySession?: InquirySessionResponse[]
}

enum PersonaVerificationStatus {
  PASSED = "PASSED",
  FAILED = "FAILED"
}

class PersonaGovernmentId {
  status?: PersonaVerificationStatus
  createdAt?: string
  submittedAt?: string
  completedAt?: string
  countryCode?: string
  frontPhotoUrl?: string
  backPhotoUrl?: string
  selfiePhotoUrl?: string
  nameFirst?: string
  nameMiddle?: string
  nameLast?: string
  nameSuffix?: string
  birthdate?: string
  addressStreet1?: string
  addressStreet2?: string
  addressCity?: string
  addressSubdivision?: string
  addressPostalCode?: string
  documentNumber?: string
  issueDate?: string
  expirationDate?: string
  identificationNumber?: string
}

class PersonaSelfie {
  status?: PersonaVerificationStatus
  createdAt?: string
  submittedAt?: string
  completedAt?: string
  leftPhotoUrl?: string
  centerPhotoUrl?: string
  rightPhotoUrl?: string
}

class PersonaInquiryBehavior {
  completionTime?: number
}

class InquirySessionResponse {
  status?: string
  createdAt?: string
  startedAt?: string
  countryCode?: string
  countryName?: string
  regionCode?: string
  regionName?: string
}

export type {
  SmartKyc,
  PersonaGovernmentId,
  PersonaSelfie,
  PersonaInquiryBehavior,
  InquirySessionResponse
}

export { PersonaVerificationStatus, PersonaStatus }
