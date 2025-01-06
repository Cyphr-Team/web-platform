import { type HistoricalIncomeStatementField } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"

export type HistoricalStatementDataRow = {
  [key in HistoricalIncomeStatementField]: number[]
}
