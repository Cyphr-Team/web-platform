import SettingsPageTopNav from "../components/molecules/SettingsPageTopNav"
import { DataTable } from "@/components/ui/data-table"
import { transactionColumns } from "../components/organisms/transaction-table/transaction-columns"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import type { PaginationState, SortingState } from "@tanstack/react-table"
import { useState } from "react"
import { useSearchOrderLoanApplications } from "../hooks/applications/order-list"

export function Component(): JSX.Element {
  // Paginate state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  // Query list applications
  const { data, isFetching } = useSearchOrderLoanApplications({
    request: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize
    }
  })

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([])
  // TODO: Update sorting params to fetch query
  // const getSort = useCallback(() => {
  //   if (!sorting.length) return undefined

  //   return {
  //     [sorting[0].id]: sorting[0].desc
  //       ? SortOrder.DESC_NULLS_LAST
  //       : SortOrder.ASC_NULLS_FIRST
  //   }
  // }, [sorting])

  return (
    <div className="mx-auto w-full p-6 md:p-8">
      <h1 className="text-3.5xl font-semibold">Settings</h1>
      <p className="mb-2 mt-1">
        Keep track of your account assessments and their statuses
      </p>
      <SettingsPageTopNav />
      <div className="flex-1 overflow-auto pt-0">
        <div className="flex flex-col gap-4 mt-2xl">
          <h1 className="text-3.5xl font-semibold">Payments</h1>
          <DataTable
            manualSorting
            columns={transactionColumns}
            data={data?.data.data ?? []}
            isLoading={isFetching}
            pagination={pagination}
            setPagination={setPagination}
            setSorting={setSorting}
            sorting={sorting}
            tableContainerClassName="flex max-h-[84vh] w-full flex-1 flex-col overflow-hidden"
            total={data?.data.total ?? 0}
            // headerFilter={() => renderHeaderFilter}
          />
        </div>
      </div>
    </div>
  )
}

Component.displayName = "TransactionList"
