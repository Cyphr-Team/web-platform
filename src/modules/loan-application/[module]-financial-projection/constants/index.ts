import { ForecastPeriod } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { FunctionComponent } from "react"
import { MonthlyHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/MonthlyHeader.tsx"
import { AnnualHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/AnnualHeader.tsx"
import { CurrentDetailHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CurrentDetailHeader.tsx"

export const GridMapper: { [key: number]: string } = {
  // Current month
  1: "grid grid-cols-2",
  // Annually - 3 years
  3: "grid grid-cols-4",
  // Annually - 5 years
  5: "grid grid-cols-6",
  // Monthly detail - 12m x 3y + 1(title) = 36 col
  36: "grid grid-cols-37",
  // Monthly detail - 12m x 5y + 1(title) = 61 col
  60: "grid grid-cols-61"
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
