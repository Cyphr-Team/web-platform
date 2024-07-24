import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { workspaceAdminApplicationColumns } from "../../components/table/loan-application-columns"
import { useQueryListPaginatedLoanApplicationScore } from "../../hooks/useQuery/useQueryListPaginatedLoanApplicationScore"

export function WorkspaceAdminApplicationList() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListPaginatedLoanApplicationScore({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  const crumbs = useBreadcrumb()

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden h-[85vh]"
        columns={workspaceAdminApplicationColumns}
        isLoading={isFetching}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}
