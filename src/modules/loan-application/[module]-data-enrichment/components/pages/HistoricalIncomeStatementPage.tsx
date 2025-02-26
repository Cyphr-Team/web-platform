import { useParams } from "react-router-dom"
import { useQueryHistoricalStatement } from "@/modules/loan-application/[module]-data-enrichment/hooks/useQueryHistoricalStatement.ts"
import HistoricalIncomeStatementTemplate from "@/modules/loan-application/[module]-data-enrichment/components/templates/HistoricalIncomeStatementTemplate.tsx"

export function Component() {
  const { id: applicationId } = useParams()
  const { data, isLoading } = useQueryHistoricalStatement({
    applicationId: applicationId!,
    enabled: !!applicationId
  })

  return (
    <HistoricalIncomeStatementTemplate
      incomeStatementData={data?.incomeStatement ?? []}
      isLoading={isLoading}
    />
  )
}
