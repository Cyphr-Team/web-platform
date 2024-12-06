import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { checkIsJudge } from "@/utils/check-roles"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import { type PaginationState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import { loanApplicationColumns } from "../components/table/loan-application-columns"
import { LoanApplicationTableHeader } from "../components/table/loan-application-header"
import {
  type FilterParams,
  useQueryListPaginateLoanApplication
} from "../hooks/useQuery/useQueryListPaginateLoanApplication"
import { JudgeApplicationList } from "./launch-kc/judge/judge-list"
import { WorkspaceAdminApplicationListFilter } from "./launch-kc/workspace-admin/workspace-admin-list-filter"
import { SbbApplicationsList } from "./sbb/list-filter"
import { ApplicationsForAdmin } from "@/modules/loanready/components/pages/ApplicationsForAdmin.tsx"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils.ts"

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
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Application</h1>
        </div>

        <LoanApplicationTableHeader onSearch={handleSearch} />
      </div>

      <DataTable
        columns={loanApplicationColumns}
        data={data?.data ?? []}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        tableContainerClassName="flex max-h-[700px] flex-1 flex-col overflow-hidden"
        total={data?.total ?? 0}
      />
    </div>
  )
}

export function Component() {
  if (isLaunchKC()) {
    if (checkIsJudge()) return <JudgeApplicationList />

    return <WorkspaceAdminApplicationListFilter />
  }
  if (isSbb()) return <SbbApplicationsList />

  if (isLoanReady() && isEnableLoanReadyV2()) return <ApplicationsForAdmin />

  return <BaseApplicationList />
}

Component.displayName = "LoanApplication"
