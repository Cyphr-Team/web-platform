import { type ForecastPeriod } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { type FunctionComponent } from "react"
import { MonthlyHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/MonthlyHeader.tsx"
import { AnnualHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/AnnualHeader.tsx"
import { CurrentDetailHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CurrentDetailHeader.tsx"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"

export const GridMapper: Record<number, string> = {
  // Current month
  1: "grid grid-cols-2",
  // Annually - 3 years
  3: "grid grid-cols-4",
  // Annually - 5 years
  5: `grid grid-cols-[1fr,repeat(5,0.7fr)] ${EXPORT_CLASS.EXTEND_FIVE_YEARS_WIDTH}`,
  // Monthly detail - 12m x 3y + 1(title) = 36 col
  36: "grid grid-cols-[1fr,repeat(36,0.7fr)]",
  // Monthly detail - 12m x 5y + 1(title) = 61 col
  60: "grid grid-cols-[1fr,repeat(60,0.7fr)]"
}

export interface HeaderProps {
  title: string
  data: Date[]
}

export const HeaderMapper: {
  [key in ForecastPeriod]: FunctionComponent<HeaderProps>
} = {
  MONTHLY: MonthlyHeader,
  ANNUALLY: AnnualHeader,
  CURRENT: CurrentDetailHeader
}

export enum ApplicationMenuName {
  Summary = "Application Summary",
  Readiness = "Loan Ready"
}

export enum ApplicationMenuNameV2 {
  Summary = "Application Summary",
  Readiness = "Loan Ready",
  FinancialProjections = "Financial Projections"
}

export const FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU = [
  {
    name: ApplicationMenuName.Summary,
    href: ""
  },
  {
    name: ApplicationMenuName.Readiness,
    href: "readiness"
  }
]

export const FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU_V2 = [
  {
    name: ApplicationMenuNameV2.Summary,
    href: ""
  },
  {
    name: ApplicationMenuNameV2.Readiness,
    href: "readiness"
  },
  {
    name: ApplicationMenuNameV2.FinancialProjections,
    href: "fp-overview"
  }
]
