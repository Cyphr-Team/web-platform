import { type IconProps, Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { type LucideIcon } from "lucide-react"
import type { Option } from "@/types/common.type.ts"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export enum ApplicationMenuName {
  business = "Business Verification",
  identity = "Identity Verification",
  document = "Documentation",
  applicationSummary = "Application Summary",
  loanReadiness = "Loan Readiness",
  finacialProjection = "Financial Projections"
}

export const APPLICATION_MENU = [
  {
    name: ApplicationMenuName.business,
    href: APP_PATH.CONFERENCE_DEMO.admin.business
  },
  {
    name: ApplicationMenuName.identity,
    href: APP_PATH.CONFERENCE_DEMO.admin.identity
  },
  {
    name: ApplicationMenuName.document,
    href: APP_PATH.CONFERENCE_DEMO.admin.documents
  },
  {
    name: ApplicationMenuName.applicationSummary,
    href: APP_PATH.CONFERENCE_DEMO.admin.applicationSummary
  },
  {
    name: ApplicationMenuName.finacialProjection,
    href: APP_PATH.CONFERENCE_DEMO.admin.financialProjection.index
  }
]

export enum LoanDecisionEnum {
  APPROVED = "approved",
  DENIED = "denied",
  IN_REVIEW = "in_review",
  REFER_TO_LOANREADY = "refer_to_loanready"
}

export const DASHBOARD_NAV_ITEM = [
  {
    title: "Dashboard",
    href: APP_PATH.CONFERENCE_DEMO.admin.index,
    icon: Icons.lineChart,
    label: "Dashboard"
  },
  {
    title: "Applications",
    href: APP_PATH.CONFERENCE_DEMO.admin.applications,
    icon: Icons.folderCheck,
    label: "Applications"
  }
]

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon | ((props: IconProps) => JSX.Element)
  label: string
  className?: string
}

export const LOAN_PLAN: Option[] = [
  {
    label: "LoanReady",
    value: LoanReadyPlanEnum.BASIC
  },
  {
    label: "LoanReady+",
    value: LoanReadyPlanEnum.PLUS
  }
]
