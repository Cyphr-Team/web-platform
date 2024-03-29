import { NavItem } from "@/types/common.type"
import { APP_PATH } from "."
import { Bell, Send, Workflow } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { UserRoles } from "@/types/user.type"

export const DASHBOARD_NAV_ITEM: NavItem[] = [
  {
    title: "Dashboard",
    href: APP_PATH.DASHBOARD,
    icon: Icons.lineChart,
    label: "Dashboard"
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
    icon: Icons.folderCheck,
    label: "Applications",
    roles: [UserRoles.LOAN_OFFICER]
  },
  {
    title: "Messages",
    href: APP_PATH.MESSAGES,
    icon: Icons.messageChatCircle,
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
  },
  {
    title: "Notifications",
    href: APP_PATH.NOTIFICATION.list,
    icon: Bell,
    label: "Notifications"
  },
  {
    title: "Onboard",
    href: APP_PATH.ONBOARD,
    icon: Send,
    label: "Onboard",
    roles: [UserRoles.FORESIGHT_ADMIN]
  },
  {
    title: "Settings",
    href: APP_PATH.SETTINGS,
    icon: Icons.setting,
    label: "Settings",
    className: "mt-auto mb-3"
  }
]
