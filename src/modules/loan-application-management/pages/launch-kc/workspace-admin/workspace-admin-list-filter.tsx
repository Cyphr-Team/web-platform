import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { DataTableViewOptions } from "@/shared/molecules/table/column-visible"
import { type IWorkspaceAdminApplicationScore } from "@/types/application/application-assign.type"
import { type Option, SortOrder } from "@/types/common.type"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type PaginationState,
  type SortingState,
  type Table
} from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useForm } from "react-hook-form"
import { WorkspaceAdminApplicationStatusCard } from "../../../components/atoms/WorkspaceAdminApplicationStatusCard"
import { workspaceAdminApplicationColumns } from "../../../components/table/applications-scores/workspace-admin-application-score-columns"
import { useQueryApplicationStageStat } from "../../../hooks/useQuery/useQueryApplicationStageStat"
import {
  loanApplicationScoreFilterSchema,
  type LoanApplicationScoreFilterValues,
  useQueryListPaginatedLoanApplicationScoreGroupByApplicationId
} from "../../../hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"
import { Filter } from "./filter"

const enum FormFieldNames {
  SCORECARDS = "scorecards",
  JUDGE_IDS = "judgeIds",
  STATUSES = "statuses",
  SEARCH = "search",
  CREATED_ON = "createdOn",
  SUBMITTED_ON = "submittedOn"
}

export function WorkspaceAdminApplicationListFilter() {
  // Get the application stage stat
  const stageStatResponse = useQueryApplicationStageStat()
  const stageStat = stageStatResponse?.data

  const crumbs = useBreadcrumb()

  // Filter state
  const filterForm = useForm<LoanApplicationScoreFilterValues>({
    resolver: zodResolver(loanApplicationScoreFilterSchema),
    defaultValues: {
      statuses: [],
      judgeIds: [],
      createdOn: undefined,
      submittedOn: undefined,
      scorecards: undefined
    }
  })

  const getFilter = useCallback(() => {
    const mapToLowerCase = (options?: Option[]) =>
      options?.map((item) => item.value.toLowerCase())

    return {
      statuses: mapToLowerCase(filterForm.watch(FormFieldNames.STATUSES)),
      judgeIds: mapToLowerCase(filterForm.watch(FormFieldNames.JUDGE_IDS)),
      createdOn: filterForm.watch(FormFieldNames.CREATED_ON),
      submittedOn: filterForm.watch(FormFieldNames.SUBMITTED_ON),
      scorecards: filterForm.watch(FormFieldNames.SCORECARDS)
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
  const { data, isFetching } =
    useQueryListPaginatedLoanApplicationScoreGroupByApplicationId({
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sort: getSort(),
      filter: getFilter(),
      searchField
    })

  useEffect(() => {
    const watchFilter = filterForm.watch(() => {
      resetTableToFirstPage()
    })

    return () => watchFilter.unsubscribe()
  }, [filterForm, resetTableToFirstPage])

  const renderHeaderFilter = useMemo(
    () =>
      function (table: Table<IWorkspaceAdminApplicationScore>) {
        return (
          <div className="flex w-full flex-wrap items-center gap-4">
            <div className="min-w-0 flex-[2] overflow-x-auto py-1">
              <Filter filterForm={filterForm} />
            </div>

            <div className="flex flex-1 justify-items-end gap-3 py-1">
              <Input
                name="search"
                placeholder="Search by 'Company Name'"
                prefixIcon={<Search className="size-4 text-text-tertiary" />}
                wrapperClassName="flex-1"
                onChange={handleSearch}
              />

              <DataTableViewOptions table={table} />
            </div>
          </div>
        )
      },
    [filterForm, handleSearch]
  )

  return (
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="mb-3 px-0" />
          <h1 className="text-2xl font-semibold">Application</h1>
        </div>
      </div>

      <WorkspaceAdminApplicationStatusCard stageStat={stageStat} />

      <DataTable
        manualSorting
        columns={workspaceAdminApplicationColumns}
        data={data?.data ?? []}
        headerFilter={renderHeaderFilter}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex h-[85vh] flex-1 flex-col"
        total={data?.total ?? 0}
      />
    </div>
  )
}
