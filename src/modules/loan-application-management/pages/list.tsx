import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import { loanApplicationColumns } from "../components/table/loan-application-columns"
import { LoanApplicationTableHeader } from "../components/table/loan-application-header"
import { FilterParams } from "../hooks/useQuery/useQueryListLoanApplication"
import { useQueryListPaginateLoanApplication } from "../hooks/useQuery/useQueryListPaginateLoanApplication"
import { PaginationState } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export function Component() {
  const [filterParams, setFilterParams] = useState<FilterParams>()

  const crumbs = useBreadcrumb()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListPaginateLoanApplication({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    ...filterParams
  })

  // Will be created only once initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((formValues: FilterParams) => {
      setPagination((preState) => ({
        ...preState,
        pageIndex: 0
      }))
      setFilterParams(formValues)
    }, 400),
    []
  )

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Loan Applications</h1>

      <div className="bg-gray-100 bg-opacity-60 p-5 rounded-lg">
        <LoanApplicationTableHeader onSearch={handleSearch} />
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden max-h-[700px]"
        isLoading={isFetching}
        columns={loanApplicationColumns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

Component.displayName = "LoanApplication"
