import {
  HistoricalIncomeStatementField,
  type HistoricalStatementByDateType
} from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { type HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"

/**
 * Group data by property name
 * Example:
 * data: [
 *   {
 *    "date": "2021-01-01",
 *    "revenue": 6368,
 *    "costOfGoodsSold":6368
 *    ...
 *   }, ...
 * ]
 *
 * groupDataByProp(data) = {
 *  "revenue": [100, 200, 300],
 *  "costOfGoodsSold": [100, 200, 300],
 *  "date": ["2021-01-01", "2021-01-02", "2021-01-03"],
 *  ...
 *  }
 *
 * @param data The HistoricalStatement grouped by date
 * @returns The HistoricalStatement grouped by field
 */
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
