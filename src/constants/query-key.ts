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
  detail: (id: number) => [...loanApplicationKeys.details(), id] as const
}
