import { USER_ROLES } from "@/common"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { NavItem } from "@/types"
import {
  Bell,
  FolderCheck,
  LineChart,
  MessageSquare,
  Workflow
} from "lucide-react"

export const APPLICATION_MENU = [
  {
    name: "Overview",
    href: "/application/:id/overview"
  },
  {
    name: "KYC",
    href: "/application/:id/kyc"
  },
  {
    name: "KYB",
    href: "/application/:id/kyb"
  },
  {
    name: "Documents",
    href: "/application/:id/documents"
  },
  {
    name: "Cash Flow",
    href: "/application/:id/cash-flow"
  },
  {
    name: "Business Plan",
    href: "/application/:id/business-plan"
  },
  {
    name: "Loan Summary",
    href: "/application/:id/loan-summary"
  },
  {
    name: "Loan Decision",
    href: "/application/:id/loan-decision"
  }
]

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: APP_PATH.DASHBOARD,
    icon: LineChart,
    label: "Dashboard"
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION_DETAILS.INDEX,
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
    roles: [USER_ROLES.CDFI_ADMIN, USER_ROLES.FORESIGHT_ADMIN]
  },
  {
    title: "Loan Programs",
    href: APP_PATH.LOAN_PROGRAM.index,
    icon: Workflow,
    label: "Loan Programs",
    roles: [USER_ROLES.CDFI_ADMIN]
  }
]

export const NOTIFICATION_NAV_ITEM: NavItem = {
  title: "Notifications",
  href: "/notifications",
  icon: Bell,
  label: "Notifications"
}

export const KYC_STATUS = {
  VERIFIED: "VERIFIED",
  UNVERIFIED: "UNVERIFIED",
  FAILED: "FAILED",
  UNCHECKED: "UNCHECKED",
  PASSED: "PASSED"
}
