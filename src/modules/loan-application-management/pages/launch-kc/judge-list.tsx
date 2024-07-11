import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { judgeLoanApplicationColumns } from "../../components/table/loan-application-columns"
import { useQueryListPaginateJudgeLoanApplication } from "../../hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

// TODO: Integrate API filters
export function JudgeApplicationList() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListPaginateJudgeLoanApplication({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden max-h-[700px]"
        columns={judgeLoanApplicationColumns}
        isLoading={isFetching}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}
