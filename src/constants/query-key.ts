export const notificationKeys = {
  all: ["notification"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (filters: string) =>
    [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: number) => [...notificationKeys.details(), id] as const
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
