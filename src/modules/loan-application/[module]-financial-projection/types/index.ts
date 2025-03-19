import { type ForecastType } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"

export type ForecastRowData = { [key in ForecastType]: number[] }
