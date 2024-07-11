import { LoanStage } from "./application"

export interface UpdateAssignedJudgeRequest {
  userIds: string[]
  applicationId: string
  stage: LoanStage
}

export interface ApplicationScore {
  id: string
  applicationId: string
  userId: string
  comment?: string | null
  applicationCaptureStage: LoanStage
  scoredAt?: Date | null
  createdAt: Date
}
