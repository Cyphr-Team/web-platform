import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { DataTableViewOptions } from "@/shared/molecules/table/column-visible"
import { type IJudgeLoanApplicationResponse } from "@/types/application/application-judge.type"
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
        table: Table<IJudgeLoanApplicationResponse<ILaunchKCApplicationScore>>
      ) {
        return (
          <div className="flex items-center flex-wrap w-full gap-4">
            <div className="flex-[2] min-w-0 overflow-x-auto py-1">
              <Filter filterForm={filterForm} />
            </div>

            <div className="justify-items-end flex flex-1 gap-3 py-1">
              <Input
                name="search"
                placeholder="Search by 'Company Name'"
                prefixIcon={<Search className="w-4 h-4 text-text-tertiary" />}
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
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
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
        tableContainerClassName="flex flex-col flex-1 h-[80vh]"
        total={data?.total ?? 0}
      />
    </div>
  )
}
