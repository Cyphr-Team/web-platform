import { type HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"
import { HistoricalIncomeStatementTemplate } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalIncomeStatementTemplate.tsx"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service.ts"
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
          <HistoricalIncomeStatementTemplate
            isPdf
            data={data}
            headerProps={{
              title: "Historical Income Statement - " + year,
              data: historicalIncomeStatementTimeStamp[year]
            }}
            title={index === 0 ? "Historical Income Statement" : undefined}
          />
        </div>
      )
    }
  )
}
