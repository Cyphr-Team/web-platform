import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import {
  type SortingState,
  type PaginationState,
  type Row
} from "@tanstack/react-table"
import { type ChangeEvent, useCallback, useMemo, useState } from "react"

import {
  FeatureFlagFilterSchema,
  type FeatureFlagFilterValues,
  FormFieldNames,
  useQueryFeatureFlags
} from "../hooks/useQuery/useQueryFeatureFlags"
import { featureFlagColumns } from "../constants/columns"
import { CreateNewFeatureFlagDialog } from "../components/DialogCreateNewFeatureFlag"
import { type FeatureFlag } from "@/types/feature-flag.types.ts"
import { type Option, SortOrder } from "@/types/common.type"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FeatureFlagTableHeader } from "@/modules/feature-flag/table/feature-flags-table-header"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"

export function Component() {
  const crumbs = useBreadcrumb()

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  // Search state
  const [searchField, setSearchField] = useState("")
  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )

  // Filter state
  const filterForm = useForm<FeatureFlagFilterValues>({
    resolver: zodResolver(FeatureFlagFilterSchema),
    defaultValues: {
      status: [],
      rolloutType: []
    }
  })

  const filter = (() => {
    const mapToValue = (options?: Option[], toLowerCase = false) =>
      options?.map((item) =>
        toLowerCase ? item.value.toLowerCase() : item.value
      )

    return {
      statuses: mapToValue(filterForm.watch(FormFieldNames.STATUS), true),
      product: mapToValue(filterForm.watch(FormFieldNames.ROLLOUT_TYPE), true)
    }
  })()

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc
        ? SortOrder.DESC_NULLS_LAST
        : SortOrder.ASC_NULLS_FIRST
    }
  }, [sorting])

  const [detailId, setDetailId] = useState<string>("")

  const handleClickDetail = (detail: Row<FeatureFlag>) => {
    setDetailId(detail.original.id)
  }

  const { data, isFetching } = useQueryFeatureFlags({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    searchField: searchField,
    sort: getSort(),
    filter: {
      status: filter.statuses?.map((status) => status === BINARY_VALUES.YES),
      rolloutType: filter.product
    }
  })

  const renderHeaderFilter = useMemo(
    () => (
      <div className="flex w-full flex-wrap items-center">
        <div className="min-w-0 flex-[2] overflow-x-auto">
          <FeatureFlagTableHeader filterForm={filterForm} />
        </div>

        <div className="flex flex-1 justify-items-end gap-3 py-1 pr-1">
          <Input
            name="search"
            placeholder="Search by key or description"
            prefixIcon={<Search className="size-4 text-text-tertiary" />}
            wrapperClassName="flex-1"
            onChange={handleSearch}
          />
        </div>
      </div>
    ),
    [filterForm, handleSearch]
  )

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Feature Flags</h1>
      <CreateNewFeatureFlagDialog id={detailId} setDetailId={setDetailId} />
      <DataTable
        manualSorting
        columns={featureFlagColumns}
        data={data?.data ?? []}
        handleClickDetail={handleClickDetail}
        headerFilter={() => renderHeaderFilter}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex max-h-[700px] flex-1 flex-col overflow-hidden"
        total={data?.total ?? 0}
      />
    </div>
  )
}

Component.displayName = "FeatureFlagPage"
