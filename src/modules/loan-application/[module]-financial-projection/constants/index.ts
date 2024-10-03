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
  // Monthly detail - 3 years
  9: "grid grid-cols-10",
  // Monthly detail - 5 years
  15: "grid grid-cols-16",
  // Monthly detail - 5 years
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
