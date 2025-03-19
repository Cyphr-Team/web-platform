enum EDecisionStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEED_TO_REVIEW = "NEED_TO_REVIEW"
}

enum EPersonaStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  UNKNOWN = "UNKNOWN" // This is not the real status of Persona, it just existed on our system
}

export { EPersonaStatus, EDecisionStatus }
