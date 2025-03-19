import { Badge } from "@/components/ui/badge"

interface Props {
  unreadCount: number
}

export function BadgeUnreadNotifications({ unreadCount }: Props) {
  const badge = unreadCount > 9 ? "9+" : unreadCount

  return (
    <Badge
      className="flex size-4 justify-center p-0"
      style={{ padding: unreadCount > 9 ? "10px" : "8px" }}
      variant="solid"
      variantColor="red"
    >
      {badge}
    </Badge>
  )
}
