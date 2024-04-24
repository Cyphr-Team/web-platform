import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { DialogSendInvite } from "./components/DialogSendInvitation"
import { columns } from "./table/columns"
import { useQueryListPaginateUser } from "./hooks/useQuery/useQueryListPaginateUser"
import { DataFlex } from "@/modules/admin/user/flex/flex.tsx"

export default async function ExampleTablePage() {}

export function Component() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListPaginateUser({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <DialogSendInvite />
      {/* TODO: Implement get users (include invited users) */}
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        isLoading={isFetching}
        setPagination={setPagination}
      />
      <DataFlex />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
