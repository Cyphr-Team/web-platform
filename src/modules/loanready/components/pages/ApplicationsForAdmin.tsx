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
import { loanSubscriptionColumns } from "@/modules/loanready/components/tables/loan-subscription-columns.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Search } from "lucide-react"
import { useQueryListAssessmentForAdmin } from "@/modules/loanready/hooks/applications/useQueryListAssessmentForAdmin.ts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Option, SortOrder } from "@/types/common.type.ts"
import debounce from "lodash.debounce"
import { FilterAdminLoanReady } from "@/modules/loanready/components/molecules/FilterAdminLoanReady.tsx"
import {
  loanReadyAssessmentFilterSchema,
  type LoanReadyAssessmentFilterValues
} from "@/modules/loanready/types/assessment.ts"

const enum FormFieldNames {
  Scores = "scores",
  Statuses = "statuses",
  Plans = "plans",
  CreatedOn = "createdOn",
  SubmittedOn = "submittedOn",
  Search = "search"
}

export function ApplicationsForAdmin() {
  const crumbs = useBreadcrumb()

  // Filter state
  const filterForm = useForm<LoanReadyAssessmentFilterValues>({
    resolver: zodResolver(loanReadyAssessmentFilterSchema),
    defaultValues: {
      scores: [],
      statuses: [],
      plans: [],
      createdOn: undefined,
      submittedOn: undefined
    }
  })

  const getFilter = useCallback(() => {
    const mapToLowerCase = (options?: Option[]) =>
      options?.map((item) => item.value.toLowerCase())

    const mapOnly = (options?: Option[]) => options?.map((item) => item.value)

    return {
      scoreLevel: mapOnly(filterForm.watch(FormFieldNames.Scores)),
      statuses: mapToLowerCase(filterForm.watch(FormFieldNames.Statuses)),
      plans: mapToLowerCase(filterForm.watch(FormFieldNames.Plans)),
      createdOn: filterForm.watch(FormFieldNames.CreatedOn),
      submittedOn: filterForm.watch(FormFieldNames.SubmittedOn)
    }
  }, [filterForm])

  // Paginate state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true }
  ])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc
        ? SortOrder.DESC_NULLS_LAST
        : SortOrder.ASC_NULLS_FIRST
    }
  }, [sorting])

  // Search state
  const [searchField, setSearchField] = useState("")
  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  // Query list applications
  const { data, isFetching } = useQueryListAssessmentForAdmin({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    sort: getSort(),
    filter: getFilter(),
    businessName: searchField
  })

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
          <FilterAdminLoanReady filterForm={filterForm} />
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
        <h1 className="text-2xl font-semibold mt-3">Assessments</h1>
      </div>

      <DataTable
        manualSorting
        columns={loanSubscriptionColumns}
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
