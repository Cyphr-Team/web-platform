import {
  NoiTotalDebtPaymentGraphType,
  RevenueExpenseGraphType
} from "@/modules/loan-application-management/constants/types/cashflow.type"
import { startOfMonth, subMonths } from "date-fns"

type TimeRangeFilter = {
  from?: Date
  to?: Date
}

const getCashFlowChartMockData = (
  data: RevenueExpenseGraphType[] | NoiTotalDebtPaymentGraphType[],
  filters: TimeRangeFilter
) => {
  // fitler data based on filters
  const filteredData = data.filter((data) => {
    const from = filters.from ?? startOfMonth(subMonths(new Date(), 2))
    const to = filters.to ?? new Date()
    return new Date(data.date) >= from && new Date(data.date) <= to
  })

  return filteredData
}

export { getCashFlowChartMockData }
