import { type ForecastRowData } from "@/modules/loan-application/[module]-financial-projection/types"
import { create } from "zustand"
import {
  getBalanceSheetData,
  getCashFlowData,
  getIncomeStatementData
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers.ts"
import { ForecastPeriod } from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { get } from "lodash"
import { FORECAST_RESULTS } from "@/modules/conference-demo/constants"
import { createSelectors } from "@/utils/store.ts"

interface FinancialStatementData {
  currentData: ForecastRowData
  annuallyData: ForecastRowData
  monthlyData: ForecastRowData
  annuallyTimeStamp: Date[]
  monthlyTimeStamp: Date[]
}

type StatementType = "incomeStatement" | "cashFlow" | "balanceSheet"

type FpDataSlice = Record<StatementType, FinancialStatementData>

const ParserFactory: Record<StatementType, CallableFunction> = {
  incomeStatement: getIncomeStatementData,
  cashFlow: getCashFlowData,
  balanceSheet: getBalanceSheetData
}

function initData(type: StatementType): FinancialStatementData {
  const parser = ParserFactory[type]

  const annuallyData = parser(FORECAST_RESULTS, ForecastPeriod.ANNUALLY)
  const monthlyData = parser(FORECAST_RESULTS, ForecastPeriod.MONTHLY)
  const currentData = parser(FORECAST_RESULTS, ForecastPeriod.CURRENT)

  const annuallyTimeStamp = get(
    FORECAST_RESULTS,
    `${type}ForecastAnnually[0].forecastData` as const,
    []
  ).map((entry) => new Date(entry.forecastDate))

  const monthlyTimeStamp = get(
    FORECAST_RESULTS,
    `${type}ForecastMonthly[0].forecastData` as const,
    []
  ).map((entry) => new Date(entry.forecastDate))

  return {
    annuallyData,
    annuallyTimeStamp,
    monthlyData,
    monthlyTimeStamp,
    currentData
  }
}

const useFpDataBase = create<FpDataSlice>(() => ({
  cashFlow: initData("cashFlow"),
  incomeStatement: initData("incomeStatement"),
  balanceSheet: initData("balanceSheet")
}))

export const useFinancialProjectionData = createSelectors(useFpDataBase)
