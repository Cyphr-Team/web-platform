import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { type PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { useQueryListSubscription } from "../hooks/useQuery/useQueryListSubscription"
import { subscriptionColumns } from "../table/subscriptionColumns"

export function Component() {
  const crumbs = useBreadcrumb()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListSubscription({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Subscriptions</h1>

      <DataTable
        columns={subscriptionColumns}
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

Component.displayName = "SubscriptionPage"
