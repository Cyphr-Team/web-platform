import { WorkspaceAdminListApplicationScoreParams } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"
import { JudgeListParams } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

export const notificationKeys = {
  all: ["notification"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (filters: string) =>
    [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: number) => [...notificationKeys.details(), id] as const
}

export const loanApplicationUserKeys = {
  all: ["loanApplicationUser"] as const,
  lists: () => [...loanApplicationUserKeys.all, "list"] as const,
  list: (filters: string) =>
    [...loanApplicationUserKeys.lists(), { filters }] as const,
  details: () => [...loanApplicationUserKeys.all, "detail"] as const,
  detail: (id: string) => [...loanApplicationUserKeys.details(), id] as const
}

export const loanApplicationKeys = {
  all: ["loanApplication"] as const,
  lists: () => [...loanApplicationKeys.all, "list"] as const,
  list: (filters: string) =>
    [...loanApplicationKeys.lists(), { filters }] as const,
  details: () => [...loanApplicationKeys.all, "detail"] as const,
  detail: (id: number) => [...loanApplicationKeys.details(), id] as const,
  statusDetail: (id: string) =>
    [...loanApplicationKeys.all, "status-detail", id] as const
}

export const judgeLoanApplicationKeys = {
  all: ["judgeLoanApplication"] as const,
  lists: () => [...judgeLoanApplicationKeys.all, "list"] as const,
  list: (filters: JudgeListParams) =>
    [...judgeLoanApplicationKeys.lists(), { filters }] as const,
  details: () => [...judgeLoanApplicationKeys.all, "detail"] as const,
  detail: (id: string) => [...judgeLoanApplicationKeys.details(), id] as const
}

export const workspaceAdminAssignJudge = {
  all: ["workspaceAdminLoanApplication"] as const,
  lists: () => [...workspaceAdminAssignJudge.all, "list"] as const,
  assignableJudges: (applicationId: string) =>
    [
      ...workspaceAdminAssignJudge.all,
      "assignable",
      { applicationId }
    ] as const,
  getApplicationWithStageScoresResponse: (applicationId: string) =>
    [
      ...workspaceAdminAssignJudge.all,
      "applicationWithStageScoresResponse",
      { applicationId }
    ] as const
}

export const workspaceAdminLoanApplicationScoreKeys = {
  all: ["workspaceAdminLoanApplicationScore"] as const,
  lists: () => [...workspaceAdminLoanApplicationScoreKeys.all, "list"] as const,
  list: (filters: WorkspaceAdminListApplicationScoreParams) =>
    [...workspaceAdminLoanApplicationScoreKeys.lists(), { filters }] as const,
  details: () =>
    [...workspaceAdminLoanApplicationScoreKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...workspaceAdminLoanApplicationScoreKeys.details(), id] as const
}

export const workspaceAdminNudgeKeys = {
  all: ["workspaceAdminNudgeKeys"] as const,
  getActiveNudges: (applicationId: string) =>
    [...workspaceAdminNudgeKeys.all, "activeNudges", { applicationId }] as const
}

export const loanApplicationDocumentKeys = {
  all: ["loanApplicationDocument"] as const,
  lists: () => [...loanApplicationDocumentKeys.all, "list"] as const,
  list: (filters: string) =>
    [...loanApplicationDocumentKeys.lists(), { filters }] as const,
  details: () => [...loanApplicationDocumentKeys.all, "detail"] as const,
  detail: (id: number) =>
    [...loanApplicationDocumentKeys.details(), id] as const
}

export const loanProgramKeys = {
  all: ["loanProgram"] as const,
  lists: () => [...loanProgramKeys.all, "list"] as const,
  list: (filters: string) => [...loanProgramKeys.lists(), { filters }] as const,
  details: () => [...loanProgramKeys.all, "detail"] as const,
  detail: (id: string) => [...loanProgramKeys.details(), id] as const
}

export const userKeys = {
  all: ["user"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const
}

export const subscriptionKeys = {
  all: ["subscription"] as const,
  lists: () => [...subscriptionKeys.all, "list"] as const,
  list: (filters: string) => [...subscriptionKeys.lists(), { filters }] as const
}

export const invitationKeys = {
  all: ["invitation"] as const,
  lists: () => [...invitationKeys.all, "list"] as const,
  list: (filters: string) => [...invitationKeys.lists(), { filters }] as const
}

export const featureFlagKeys = {
  all: ["featureFlag"] as const,
  lists: () => [...featureFlagKeys.all, "list"] as const,
  listsById: () => [...featureFlagKeys.all, "listById"] as const,
  list: (filters: string) => [...featureFlagKeys.lists(), { filters }] as const,
  listById: (filters: string) =>
    [...featureFlagKeys.listsById(), { filters }] as const,
  details: () => [...featureFlagKeys.all, "detail"] as const,
  detail: (id: string) => [...featureFlagKeys.details(), id] as const
}

export const whitelistUserKeys = {
  all: ["whitelistUser"] as const,
  detail: (id: string) => [...whitelistUserKeys.details(), id] as const,
  details: () => [...whitelistUserKeys.all, "detail"] as const,
  lists: () => [...whitelistUserKeys.all, "list"] as const,
  list: (filters: string) =>
    [...whitelistUserKeys.lists(), { filters }] as const
}
