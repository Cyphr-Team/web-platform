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
import { KybDetailLiensData } from "./type"
import { Option } from "@/common"

export const APPLICATION_MENU = (id: string) => [
  {
    name: "Overview",
    href: `/application/${id}/overview`
  },
  {
    name: "KYC",
    href: `/application/${id}/kyc`
  },
  {
    name: "KYB",
    href: `/application/${id}/kyb`
  },
  {
    name: "Documents",
    href: APP_PATH.LOAN_APPLICATION_DETAILS.DOCUMENTS.detail(id)
  },
  {
    name: "Cash Flow",
    href: `/application/${id}/cash-flow`
  },
  {
    name: "Business Plan",
    href: `/application/${id}/business-plan`
  },
  {
    name: "Loan Summary",
    href: `/application/${id}/loan-summary`
  },
  {
    name: "Loan Decision",
    href: `/application/${id}/loan-decision`
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

export const STATE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  UNKNOWN: "UNKNOWN"
}

export const UNKNOWN_VALUE = "N/A"

export const FAKE_LIENS_DATA = [
  {
    type: "ucc",
    date: "2021-04-01",
    status: "OPEN",
    securedParties: [
      "C T CORPORATION SYSTEM, AS REPRESENTATIVE",
      "C T CORPORATION SYSTEM, AS REPRESENTATIVE"
    ],
    fileUrl: [
      "https://storage.googleapis.com/...",
      "https://storage.googleapis.com/..."
    ]
  }
] as KybDetailLiensData[]

export const LOAN_STATUS: Option[] = [
  { label: "Flagged", value: "Flagged" },
  { label: "Closed", value: "Closed" },
  { label: "Ready", value: "Ready" },
  { label: "In Progress", value: "In Progress" }
]

export const LOAN_PRODUCTS: Option[] = [
  { label: "Revenue Share", value: "Revenue Share" },
  { label: "Emergency", value: "Emergency" },
  { label: "Micro Loan", value: "Micro Loan" },
  { label: "Term Loan", value: "Term Loan" },
  { label: "Credit Line", value: "Credit Line" },
  { label: "SBA", value: "SBA" }
]

export const LOAN_AMOUNT: Option[] = [
  { label: "< $1,000", value: "< $1,000" },
  { label: "$1,000 - $10,000", value: "$1,000 - $10,000" },
  { label: "$10,000 - $20,000", value: "$10,000 - $20,000" },
  { label: "$20,000 - $30,000", value: "$20,000 - $30,000" },
  { label: "$40,000 - $50,000", value: "$40,000 - $50,000" },
  { label: "> $50,000", value: "> $50,000" }
]
