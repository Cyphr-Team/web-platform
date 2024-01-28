import { notificationKeys } from "@/constants/query-key"
import { useQuery } from "@tanstack/react-query"

// TODO: Update type
export const useNotification = () => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: () => {
      try {
        const item = localStorage.getItem("DEMO_NOTIFICATION")
        return JSON.parse(item ?? "[{}]")
      } catch {
        return null
      }
    },
    staleTime: 0
  })
}
