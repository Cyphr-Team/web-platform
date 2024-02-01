import { NavItem } from "@/types/common.type"
import { APP_PATH } from "."
import {
  Bell,
  FolderCheck,
  LineChart,
  MessageSquare,
  Workflow
} from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { UserRoles } from "@/types/user.type"

export const DASHBOARD_NAV_ITEM: NavItem[] = [
  {
    title: "Dashboard",
    href: APP_PATH.DASHBOARD,
    icon: LineChart,
    label: "Dashboard"
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
    icon: FolderCheck,
    label: "Applications"
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    label: "Messages"
  },
  {
    title: "Users",
    href: APP_PATH.ADMIN_USERS.index,
    icon: Icons.user,
    label: "users",
    roles: [UserRoles.CDFI_ADMIN, UserRoles.FORESIGHT_ADMIN]
  },
  {
    title: "Loan Programs",
    href: APP_PATH.LOAN_PROGRAM.index,
    icon: Workflow,
    label: "Loan Programs",
    roles: [UserRoles.CDFI_ADMIN]
  }
]

export const NOTIFICATION_NAV_ITEM: NavItem = {
  title: "Notifications",
  href: "/notifications",
  icon: Bell,
  label: "Notifications"
}
