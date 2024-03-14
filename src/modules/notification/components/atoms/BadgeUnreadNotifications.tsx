import { Badge } from "@/components/ui/badge"

type Props = {
  unreadCount: number
}

export const BadgeUnreadNotifications: React.FC<Props> = ({ unreadCount }) => {
  const badge = unreadCount > 9 ? "9+" : unreadCount
  return (
    <Badge
      variant="solid"
      variantColor="red"
      className="flex p-0 h-4 w-4 justify-center"
      style={{ padding: unreadCount > 9 ? "10px" : "8px" }}
    >
      {badge}
    </Badge>
  )
}
