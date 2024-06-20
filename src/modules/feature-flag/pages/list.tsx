import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { PaginationState, Row } from "@tanstack/react-table"
import { useState } from "react"

import { useQueryFeatureFlags } from "../hooks/useQuery/useQueryFeatureFlags"
import { featureFlagColumns } from "../constants/columns"
import { CreateNewFeatureFlagDialog } from "../components/DialogCreateNewFeatureFlag"
import { FeatureFlag } from "@/types/feature-flag.types.ts"

export function Component() {
  const crumbs = useBreadcrumb()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const [detailId, setDetailId] = useState<string>("")

  const handleClickDetail = (detail: Row<FeatureFlag>) => {
    setDetailId(detail.original.id)
  }

  const { data, isFetching } = useQueryFeatureFlags({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Feature Flags</h1>
      <CreateNewFeatureFlagDialog setDetailId={setDetailId} id={detailId} />
      <DataTable
        handleClickDetail={handleClickDetail}
        tableContainerClassName="flex flex-col flex-1 overflow-hidden max-h-[700px]"
        isLoading={isFetching}
        columns={featureFlagColumns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

Component.displayName = "FeatureFlagPage"
