import { Badge } from "@/components/ui/badge"

interface Props {
  unreadCount: number
}

export function BadgeUnreadNotifications({ unreadCount }: Props) {
  const badge = unreadCount > 9 ? "9+" : unreadCount

  return (
    <Badge
      className="flex p-0 h-4 w-4 justify-center"
      style={{ padding: unreadCount > 9 ? "10px" : "8px" }}
      variant="solid"
      variantColor="red"
    >
      {badge}
    </Badge>
  )
}
