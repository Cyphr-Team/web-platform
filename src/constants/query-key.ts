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
  detail: (id: number) => [...userKeys.details(), id] as const
}

export const subscriptionKeys = {
  all: ["subscription"] as const,
  lists: () => [...subscriptionKeys.all, "list"] as const,
  list: (filters: string) => [...subscriptionKeys.lists(), { filters }] as const
}

export const featureFlagKeys = {
  all: ["featureFlag"] as const,
  lists: () => [...featureFlagKeys.all, "list"] as const,
  list: (filters: string) => [...featureFlagKeys.lists(), { filters }] as const,
  details: () => [...featureFlagKeys.all, "detail"] as const,
  detail: (id: string) => [...featureFlagKeys.details(), id] as const
}
