import {
  HistoricalIncomeStatementField,
  type HistoricalStatementByDateType
} from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { type HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"

export function groupDataByProp(
  data: HistoricalStatementByDateType[]
): HistoricalStatementDataRow {
  return Object.values(HistoricalIncomeStatementField).reduce((acc, field) => {
    return {
      ...acc,
      [field]: data.map((item) => item[field])
    }
  }, {}) as HistoricalStatementDataRow
}
