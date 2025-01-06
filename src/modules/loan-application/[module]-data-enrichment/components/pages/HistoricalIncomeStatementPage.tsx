import { cn } from "@/lib/utils.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useQueryHistoricalStatement } from "@/modules/loan-application/[module]-data-enrichment/hooks/historical-statements/useQueryHistoricalStatement.ts"
import { isEnableHistoricalFinancialsEnrichment } from "@/utils/feature-flag.utils.ts"
import { HistoricalIncomeStatementTemplate } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalIncomeStatementTemplate.tsx"
import { groupDataByProp } from "@/modules/loan-application/[module]-data-enrichment/services/historical-statement.service.ts"
import { type HistoricalIncomeStatementByDate } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { NoData } from "@/modules/loan-application-management/components/atoms/NoData.tsx"

export function Component() {
  const { id: applicationId } = useParams()
  const { data, isLoading } = useQueryHistoricalStatement({
    applicationId: applicationId!,
    enabled: !!applicationId && isEnableHistoricalFinancialsEnrichment()
  })
  const incomeStatementData = useMemo(() => data?.incomeStatement ?? [], [data])
  const incomeStatementDataGroupedByProp = useMemo(
    () => groupDataByProp(incomeStatementData),
    [incomeStatementData]
  )
  const incomeStatementTimeStamps = useMemo(
    () =>
      incomeStatementData.map(
        (item: HistoricalIncomeStatementByDate) => new Date(item.date)
      ),
    [incomeStatementData]
  )

  return (
    <ErrorWrapper
      isError={!incomeStatementData || incomeStatementData.length < 1}
    >
      <div className="flex flex-col gap-y-2xl">
        <div className="flex w-full items-center justify-end gap-2">
          <Drawer />
        </div>

        <LoadingWrapper
          className={cn(
            isLoading
              ? "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
              : null
          )}
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-y-6xl">
            {!incomeStatementData?.length ? (
              <NoData />
            ) : (
              <HistoricalIncomeStatementTemplate
                data={incomeStatementDataGroupedByProp}
                headerProps={{
                  data: incomeStatementTimeStamps,
                  title: "Historical Income Statement"
                }}
              />
            )}
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
