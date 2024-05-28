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
  EXPIRED = "EXPIRED"
}

export { EPersonaStatus, EDecisionStatus }
