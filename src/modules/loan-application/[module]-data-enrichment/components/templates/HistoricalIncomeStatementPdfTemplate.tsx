import { type HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service.ts"
import { HistoricalIncomeStatementTable } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalIncomeStatementTable.tsx"

interface HistoricalStatementTemplateProps {
  historicalIncomeStatementTimeStamp: Record<string, Date[]>
  historicalIncomeStatementDataByYears: Record<
    string,
    HistoricalStatementDataRow
  >
}

export function HistoricalIncomeStatementPdfTemplate(
  props: HistoricalStatementTemplateProps
) {
  const {
    historicalIncomeStatementTimeStamp,
    historicalIncomeStatementDataByYears
  } = props

  return Object.entries(historicalIncomeStatementDataByYears).map(
    ([year, data], index) => {
      return (
        <div
          key={`${year}-${index}`}
          className={`w-fit ${EXPORT_CLASS.HISTORICAL_FINANCIALS}`}
        >
          <div className="gap-y-2xl, flex w-fit flex-col">
            {index === 0 ? (
              <h1 className="text-3xl font-semibold">
                Historical Income Statement
              </h1>
            ) : null}
            <HistoricalIncomeStatementTable
              data={data}
              headerProps={{
                title: "Historical Income Statement - " + year,
                data: historicalIncomeStatementTimeStamp[year]
              }}
            />
          </div>
        </div>
      )
    }
  )
}
