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
  financialProjections = "Financial Projections"
}

export const APPLICATION_MENU = [
  {
    name: ApplicationMenuName.business,
    href: (id: string) => APP_PATH.CONFERENCE_DEMO.admin.business(id)
  },
  {
    name: ApplicationMenuName.identity,
    href: (id: string) => APP_PATH.CONFERENCE_DEMO.admin.identity(id)
  },
  {
    name: ApplicationMenuName.document,
    href: (id: string) => APP_PATH.CONFERENCE_DEMO.admin.documents(id)
  },
  {
    name: ApplicationMenuName.applicationSummary,
    href: (id: string) => APP_PATH.CONFERENCE_DEMO.admin.applicationSummary(id)
  },
  {
    name: ApplicationMenuName.financialProjections,
    href: (id: string) =>
      APP_PATH.CONFERENCE_DEMO.admin.financialProjection.index(id)
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
