import { Icons } from "@/components/ui/icons"
import { FeatureKey } from "@/hooks/useCanAccess"
import { type NavItem } from "@/types/common.type"
import {
  judgeRoles,
  platformAdminRoles,
  reviewerRoles,
  workspaceAdminRoles
} from "@/types/user.type"
import { isKccBank, isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import { CalendarSearch, Files, Flag, Send, Workflow } from "lucide-react"
import { APP_PATH } from "."
import { FEATURE_FLAGS } from "./feature-flag.constants"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"

export const DASHBOARD_NAV_ITEM: NavItem[] = [
  {
    title: "Dashboard",
    href: APP_PATH.DASHBOARD,
    icon: Icons.lineChart,
    label: "Dashboard",
    roles: reviewerRoles()
      .concat(workspaceAdminRoles())
      .concat(platformAdminRoles()),
    disabled: isLaunchKC() || isLoanReady(), // Temporary hidden for FF: HIDE_LENDER_DASHBOARD_LAUNCHKC
    featureKey: FeatureKey.DASHBOARD
  },
  {
    title: "Subscriptions",
    href: APP_PATH.SUBSCRIPTIONS,
    icon: CalendarSearch,
    label: "Subscriptions",
    roles: platformAdminRoles(),
    featureFlag: FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT,
    featureKey: FeatureKey.SUBSCRIPTION
  },
  {
    title: "Feature Flags",
    href: APP_PATH.FEATURE_FLAGS,
    icon: Flag,
    label: "Feature Flags",
    roles: platformAdminRoles(),
    featureKey: FeatureKey.FEATURE_FLAG
  },
  {
    title: "Documents",
    href: APP_PATH.DOCUMENTS,
    icon: Files,
    label: "Documents",
    roles: platformAdminRoles(),
    disabled: isEnableChatSupport(),
    featureKey: FeatureKey.CHATBOT_DOCUMENT
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
    icon: Icons.folderCheck,
    label: "Applications",
    roles: reviewerRoles().concat(workspaceAdminRoles()).concat(judgeRoles()),
    featureKey: FeatureKey.FEATURE_FLAG
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
    roles: workspaceAdminRoles().concat(platformAdminRoles()),
    featureKey: FeatureKey.USER
  },
  {
    title: "Loan Programs",
    href: APP_PATH.LOAN_PROGRAM.index,
    icon: Workflow,
    label: "Loan Programs",
    roles: workspaceAdminRoles(),
    disabled: isKccBank() || isSbb() || isLoanReady(),
    featureKey: FeatureKey.LOAN_PROGRAM
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
    roles: platformAdminRoles(),
    featureKey: FeatureKey.ONBOARD
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
