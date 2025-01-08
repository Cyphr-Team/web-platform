import type { HistoricalIncomeStatementByDate } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { useMemo } from "react"
import { groupDataByProp } from "@/modules/loan-application/[module]-data-enrichment/services/historical-statement.service.ts"
import { ErrorWrapper } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ErrorWrapper.tsx"
import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils.ts"
import { NoData } from "@/modules/loan-application-management/components/atoms/NoData.tsx"
import { HistoricalIncomeStatementTable } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalIncomeStatementTable.tsx"

interface Props {
  isLoading: boolean
  incomeStatementData: HistoricalIncomeStatementByDate[]
  includeDownloadReports?: boolean
  includeTitle?: boolean
  isPdf?: boolean
}

export default function HistoricalIncomeStatementTemplate(props: Props) {
  const {
    incomeStatementData,
    isLoading,
    includeDownloadReports = true,
    includeTitle = true,
    isPdf = false
  } = props
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
        {includeDownloadReports ? (
          <div className="flex w-full items-center justify-end gap-2">
            <Drawer />
          </div>
        ) : null}

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
              <div
                className={cn(
                  "flex flex-col gap-y-2xl",
                  isPdf ? "w-fit" : "w-full"
                )}
              >
                {includeTitle ? (
                  <h1 className="text-3xl font-semibold">
                    Historical Income Statement
                  </h1>
                ) : null}
                <HistoricalIncomeStatementTable
                  data={incomeStatementDataGroupedByProp}
                  headerProps={{
                    data: incomeStatementTimeStamps,
                    title: "Historical Income Statement"
                  }}
                />
              </div>
            )}
          </div>
        </LoadingWrapper>
      </div>
    </ErrorWrapper>
  )
}
