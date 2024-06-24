import { UUID } from "crypto"
import { PersonaStatus } from "../../../../lib/persona/persona.types"

// Insights
type InsightData = {
  category?: string
  subLabel?: IdentityVerificationStatus
  status?: TaskFieldStatus
  message?: string
}
type SmartKycInsight = {
  governmentId?: InsightData
  selfieVerification?: InsightData
}

enum IdentityVerificationStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED"
}

enum TaskFieldStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  WARNING = "WARNING"
}

export { IdentityVerificationStatus }

export type { InsightData, SmartKycInsight, TaskFieldStatus }

export interface SmartKycPersonaDetailResponse {
  inquiryId: string
  referenceId: UUID
  institutionId: UUID
  personaStatus: PersonaStatus
}
