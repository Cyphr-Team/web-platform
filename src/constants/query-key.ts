export const notificationKeys = {
  all: ["notification"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (filters: string) =>
    [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: number) => [...notificationKeys.details(), id] as const
}
