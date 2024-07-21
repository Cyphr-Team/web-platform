import { DataTable } from "@/components/ui/data-table"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { SortOrder } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState, SortingState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ScoredBadgeStatus } from "../../components/atoms/ScoredBadgeStatus"
import { StatusRoundBadge } from "../../components/atoms/StatusRoundBadge"
import { judgeLoanApplicationColumns } from "../../components/table/loan-application-columns"
import { ASSIGNABLE_STAGE, SCORED_STATUS } from "../../constants"
import {
  judgeLoanApplicationFilterSchema,
  JudgeLoanApplicationFilterValues,
  useQueryListPaginateJudgeLoanApplication
} from "../../hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

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

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Loan Applications</h1>
        </div>
      </div>

      <div className="mt-4">
        <Form {...filterForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 flex gap-3">
                <FormField
                  control={filterForm.control}
                  name="isScoreds"
                  render={({ field }) => (
                    <MultiSelectRound
                      label="Scorecard Status"
                      field={field}
                      options={SCORED_STATUS}
                      labelHOC={(option, close) => (
                        <ScoredBadgeStatus scoredAt={option.value === "true"}>
                          {option.label} {close}
                        </ScoredBadgeStatus>
                      )}
                    />
                  )}
                />
                <FormField
                  control={filterForm.control}
                  name="applicationCaptureStages"
                  render={({ field }) => (
                    <MultiSelectRound
                      label="Round"
                      field={field}
                      options={ASSIGNABLE_STAGE}
                      labelHOC={(option, close) => (
                        <StatusRoundBadge
                          round={option.value as LoanApplicationStatus}
                        >
                          {option.label} {close}
                        </StatusRoundBadge>
                      )}
                    />
                  )}
                />
              </div>
              <div className="flex-shrink-0 min-w-[300px] mt-auto">
                <Input
                  prefixIcon={<Search className="w-4 h-4 text-text-tertiary" />}
                  placeholder="Search by 'Company Name'"
                  name="search"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden h-[80vh]"
        columns={judgeLoanApplicationColumns}
        isLoading={isFetching}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  )
}
