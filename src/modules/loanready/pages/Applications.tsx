import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type PaginationState } from "@tanstack/react-table"
import { useSearchOrderLoanApplications } from "@/modules/loanready/hooks/applications/order-list.ts"
import { DataTable } from "@/components/ui/data-table.tsx"
import { useState } from "react"
import { orderApplicationColumn } from "@/modules/loanready/constants/order-application-column.tsx"
import { useNavigate } from "react-router-dom"
import { loanReadyApplicationHandleClickDetail } from "@/modules/loanready/utils"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils.ts"
import LoanApplicationsPage from "@/modules/loanready/pages/LoanApplications.tsx"
import { StartApplicationButton } from "@/modules/loanready/components/molecules/StartApplicationButton.tsx"
import { EmptyApplications } from "@/modules/loanready/pages/EmptyApplications"
import { useQueryGetLoanPrograms } from "@/modules/loan-application/hooks/program/useQueryLoanPrograms.ts"
import { useGetUnusedLoanReadySubscription } from "@/modules/loanready/hooks/payment/useGetUnusedLoanReadySubscription"
import { UnusedReportBannerList } from "@/modules/loanready/components/organisms/UnusedReportBannerList"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export function Component() {
  if (isEnableLoanReadyV2()) return <LoanReadyApplications />

  return <LoanApplicationsPage />
}

export default function LoanReadyApplications() {
  const navigate = useNavigate()
  // We used this hook to get LoanReady program
  // Please note that we only have one LoanReady program, so we use the first one
  const loanPrograms = useQueryGetLoanPrograms()

  // Paginate state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Query list applications
  const { data, isFetching } = useSearchOrderLoanApplications({
    request: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      filter: {
        plan: [LoanReadyPlanEnum.BASIC, LoanReadyPlanEnum.PLUS]
      }
    }
  })

  const clickDetailHandler = loanReadyApplicationHandleClickDetail(navigate)
  const loanApplicationColumns = orderApplicationColumn(
    (row) => () => clickDetailHandler(row)
  )

  // Query unused subscriptions
  const { data: unusedSubscriptions } = useGetUnusedLoanReadySubscription({
    enabled: isEnableLoanReadyV2()
  })

  return (
    <div className="container mx-auto p-2xl md:p-4xl">
      <h1 className="text-3.5xl font-semibold">Account Assessments</h1>
      <p className="mb-2 mt-1">
        Keep track of your account assessments and their statuses
      </p>

      {!isFetching && !data?.data.data?.length ? (
        <>
          {unusedSubscriptions?.data?.length ? (
            <UnusedReportBannerList
              loanProgramId={loanPrograms.data?.data[0].id}
              subscriptions={unusedSubscriptions?.data}
            />
          ) : null}
          <EmptyApplications loanProgramId={loanPrograms.data?.data[0].id} />
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <StartApplicationButton
              className="bg-lime-400 font-bold text-black hover:bg-lime-300"
              loanProgramId={loanPrograms.data?.data[0].id}
            />
          </div>
          {unusedSubscriptions?.data?.length ? (
            <UnusedReportBannerList
              loanProgramId={loanPrograms.data?.data[0].id}
              subscriptions={unusedSubscriptions?.data}
            />
          ) : null}
          <DataTable
            columns={loanApplicationColumns}
            data={data?.data.data ?? []}
            isLoading={isFetching}
            pagination={pagination}
            setPagination={setPagination}
            tableCellClassName="text-primary"
            tableContainerClassName="flex h-[60vh] flex-1 flex-col rounded-full"
            tableHeadClassName="text-xs text-[#667085]"
            tableHeaderClassName="bg-[#f9fafb] !text-xs"
            tableWrapperClassName="rounded-lg"
            total={data?.data.total ?? 0}
          />
        </>
      )}
    </div>
  )
}

Component.displayName = "ApplicantOrderLoanApplications"
