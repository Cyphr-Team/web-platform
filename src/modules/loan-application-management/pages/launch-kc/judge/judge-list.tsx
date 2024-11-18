import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { DataTableViewOptions } from "@/shared/molecules/table/column-visible"
import { type JudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
import { type ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { SortOrder } from "@/types/common.type"
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
import { judgeLoanApplicationColumns } from "../../../components/table/applications-scores/judge-application-score-columns"
import {
  judgeLoanApplicationFilterSchema,
  type JudgeLoanApplicationFilterValues,
  useQueryListPaginateJudgeLoanApplication
} from "../../../hooks/useQuery/useQueryListPaginateJudgeLoanApplication"
import { Filter } from "./filter"

export function JudgeApplicationList() {
  const filterForm = useForm<JudgeLoanApplicationFilterValues>({
    resolver: zodResolver(judgeLoanApplicationFilterSchema),
    defaultValues: {
      applicationCaptureStages: [],
      isScoreds: []
    }
  })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true }
  ])

  const [searchField, setSearchField] = useState("")

  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTable()
    },
    400
  )

  const resetTable = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  const getFilter = useCallback(() => {
    const getWatchValue = (formKey: keyof JudgeLoanApplicationFilterValues) => {
      return filterForm.watch(formKey)?.map((option) => option.value)
    }

    return {
      applicationCaptureStages: getWatchValue("applicationCaptureStages"),
      isScoreds: getWatchValue("isScoreds")?.map((value) => value === "true")
    }
  }, [filterForm])

  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc
        ? SortOrder.DESC_NULLS_LAST
        : SortOrder.ASC_NULLS_FIRST
    }
  }, [sorting])

  const { data, isFetching } = useQueryListPaginateJudgeLoanApplication({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    sort: getSort(),
    filter: getFilter(),
    searchField
  })

  useEffect(() => {
    const watchFilter = filterForm.watch(() => {
      resetTable()
    })

    return () => watchFilter.unsubscribe()
  }, [filterForm, resetTable])

  const renderHeaderFilter = useMemo(
    () =>
      function (
        table: Table<JudgeLoanApplicationResponse<ILaunchKCApplicationScore>>
      ) {
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
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Application</h1>
        </div>
      </div>

      <DataTable
        manualSorting
        columns={judgeLoanApplicationColumns}
        data={data?.data ?? []}
        headerFilter={renderHeaderFilter}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex h-[80vh] flex-1 flex-col"
        total={data?.total ?? 0}
      />
    </div>
  )
}
