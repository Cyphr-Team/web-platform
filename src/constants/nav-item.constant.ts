import { NavItem } from "@/types/common.type"
import { APP_PATH } from "."
import { CalendarSearch, Flag, Send, Workflow } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { UserRoles } from "@/types/user.type"
import { FEATURE_FLAGS } from "./feature-flag.constants"
import { isKccBank } from "@/utils/domain.utils"

export const DASHBOARD_NAV_ITEM: NavItem[] = [
  {
    title: "Dashboard",
    href: APP_PATH.DASHBOARD,
    icon: Icons.lineChart,
    label: "Dashboard"
  },
  {
    title: "Subscriptions",
    href: APP_PATH.SUBSCRIPTIONS,
    icon: CalendarSearch,
    label: "Subscriptions",
    roles: [UserRoles.FORESIGHT_ADMIN],
    featureFlag: FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT
  },
  {
    title: "Feature Flags",
    href: APP_PATH.FEATURE_FLAGS,
    icon: Flag,
    label: "Feature Flags",
    roles: [UserRoles.FORESIGHT_ADMIN]
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
    icon: Icons.folderCheck,
    label: "Applications",
    roles: [UserRoles.LOAN_OFFICER]
  },
  // Hide because havent implemented yet
  // {
  //   title: "Messages",
  //   href: APP_PATH.MESSAGES,
  //   icon: Icons.messageChatCircle,
  //   label: "Messages"
  // },
  {
    title: "Users",
    href: APP_PATH.ADMIN_USERS.USER.index,
    icon: Icons.user,
    label: "users",
    roles: [UserRoles.CDFI_ADMIN, UserRoles.FORESIGHT_ADMIN]
  },
  {
    title: "Loan Programs",
    href: APP_PATH.LOAN_PROGRAM.index,
    icon: Workflow,
    label: "Loan Programs",
    roles: [UserRoles.CDFI_ADMIN],
    disabled: isKccBank()
  },
  // Hide because havent implemented yet
  // {
  //   title: "Notifications",
  //   href: APP_PATH.NOTIFICATION.list,
  //   icon: Bell,
  //   label: "Notifications"
  // },
  {
    title: "Onboard",
    href: APP_PATH.ONBOARD,
    icon: Send,
    label: "Onboard",
    roles: [UserRoles.FORESIGHT_ADMIN]
  }
  // Hide because havent implemented yet
  // {
  //   title: "Settings",
  //   href: APP_PATH.SETTINGS,
  //   icon: Icons.setting,
  //   label: "Settings",
  //   className: "mt-auto mb-3"
  // }
]
