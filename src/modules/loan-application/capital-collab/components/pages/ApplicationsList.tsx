import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { type PaginationState, type SortingState } from "@tanstack/react-table"
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { Input } from "@/components/ui/input.tsx"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormFieldNames,
  LoanApplicationFilterSchema,
  type LoanApplicationFilterValues,
  useQueryListPaginateLoanApplication
} from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateLoanApplication.ts"
import debounce from "lodash.debounce"
import { ApplicationsFilter } from "@/modules/loan-application/capital-collab/components/molecules/ApplicationsFilter"
import { type Option, SortOrder } from "@/types/common.type.ts"
import { listApplicationColumns } from "@/modules/loan-application/capital-collab/components/organisms/list-application-columns"

export function CapitalCollabApplicationsList() {
  const crumbs = useBreadcrumb()

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

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
  const filterForm = useForm<LoanApplicationFilterValues>({
    resolver: zodResolver(LoanApplicationFilterSchema),
    defaultValues: {
      status: [],
      createdOn: undefined,
      submittedOn: undefined
    }
  })

  const filter = (() => {
    const mapToLowerCase = (options?: Option[]) =>
      options?.map((item) => item.value.toLowerCase())

    return {
      statuses: mapToLowerCase(filterForm.watch(FormFieldNames.STATUS)),
      createdOn: filterForm.watch(FormFieldNames.CREATED_ON),
      submittedOn: filterForm.watch(FormFieldNames.SUBMITTED_ON)
    }
  })()

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return `${sorting[0].id}:${
      sorting[0].desc ? SortOrder.DESC_NULLS_LAST : SortOrder.ASC_NULLS_FIRST
    }`
  }, [sorting])

  // Query list applications
  const { data, isFetching } = useQueryListPaginateLoanApplication({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search: searchField,
    sort: getSort(),
    status: filter.statuses,
    createdOn: filter.createdOn,
    submittedOn: filter.submittedOn
  })

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  useEffect(() => {
    const watchFilter = filterForm.watch(() => {
      resetTableToFirstPage()
    })

    return () => watchFilter.unsubscribe()
  }, [filterForm, resetTableToFirstPage])

  const renderHeaderFilter = useMemo(
    () => (
      <div className="flex w-full flex-wrap items-center gap-4">
        <div className="min-w-0 flex-[2] overflow-x-auto py-1">
          <ApplicationsFilter filterForm={filterForm} />
        </div>

        <div className="flex flex-1 justify-items-end gap-3 py-1 pr-1">
          <Input
            name="search"
            placeholder="Search"
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
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <div className="flex flex-col gap-1">
        <Breadcrumbs breads={crumbs} className="px-0" />
        <h1 className="text-2xl font-semibold mt-3">Applications</h1>
      </div>

      <DataTable
        manualSorting
        columns={listApplicationColumns}
        data={data?.data ?? []}
        headerFilter={() => renderHeaderFilter}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex max-h-[84vh] flex-1 flex-col overflow-hidden"
        total={data?.total ?? 0}
      />
    </div>
  )
}
