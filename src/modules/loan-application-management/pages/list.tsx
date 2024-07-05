import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { checkIsJudge } from "@/utils/check-roles"
import { isLaunchKC } from "@/utils/domain.utils"
import { PaginationState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import { loanApplicationColumns } from "../components/table/loan-application-columns"
import { LoanApplicationTableHeader } from "../components/table/loan-application-header"
import { FilterParams } from "../hooks/useQuery/useQueryListLoanApplication"
import { useQueryListPaginateLoanApplication } from "../hooks/useQuery/useQueryListPaginateLoanApplication"
import { WorkspaceAdminApplicationList } from "./launch-kc/workspace-admin-list"
import { JudgeApplicationList } from "./launch-kc/judge-list"

export function BaseApplicationList() {
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
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>

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

export function Component() {
  if (isLaunchKC()) {
    if (checkIsJudge()) return <JudgeApplicationList />

    return <WorkspaceAdminApplicationList />
  }

  return <BaseApplicationList />
}

Component.displayName = "LoanApplication"
