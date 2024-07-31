import { DataTable } from "@/components/ui/data-table"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { Option, SortOrder } from "@/types/common.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState, SortingState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import {
  buildUserMultiSelectLabelHelper,
  UserMultiSelectOption
} from "../../components/atoms/UserMultiSelectOption"
import { workspaceAdminApplicationColumns } from "../../components/table/loan-application-columns"
import { useQueryGetJudgeList } from "../../hooks/useQuery/useQueryGetJudgeList"
import {
  useQueryListPaginatedLoanApplicationScoreGroupByApplicationId,
  loanApplicationScoreFilterSchema,
  LoanApplicationScoreFilterValues
} from "../../hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"
import { StatusRoundBadge } from "../../components/atoms/StatusRoundBadge"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords } from "@/utils"
import { WorkspaceAdminApplicationStatusCard } from "../../components/atoms/WorkspaceAdminApplicationStatusCard"
import { useQueryApplicationStageStat } from "../../hooks/useQuery/useQueryApplicationStageStat"

const ROUND_STATUS_OPTIONS: Option[] = [
  {
    value: LoanApplicationStatus.PENDING_SUBMISSION,
    label: "Pending submission"
  },
  { value: LoanApplicationStatus.READY_FOR_REVIEW, label: "Ready for review" },

  { value: LoanApplicationStatus.ROUND_1, label: "Round 1" },
  { value: LoanApplicationStatus.ROUND_2, label: "Round 2" },
  { value: LoanApplicationStatus.ROUND_3, label: "Round 3" },

  {
    value: LoanApplicationStatus.ELIMINATED_AFTER_INITIAL_REVIEW,
    label: "Eliminated after initial review"
  },
  {
    value: LoanApplicationStatus.ELIMINATED_AFTER_ROUND_1,
    label: "Eliminated after round 1"
  },
  {
    value: LoanApplicationStatus.ELIMINATED_AFTER_ROUND_2,
    label: "Eliminated after round 2"
  },
  {
    value: LoanApplicationStatus.ELIMINATED_AFTER_ROUND_3,
    label: "Eliminated after round 3"
  }
]
const roundOptionToStatus = (roundOption: Option) => {
  const status = Object.values(LoanApplicationStatus).find(
    (value) => value.toLowerCase() === roundOption.value.toLowerCase()
  )
  return status ?? LoanApplicationStatus.UNKNOWN
}

export function WorkspaceAdminApplicationListFilter() {
  // Get the application stage stat
  const stageStatResponse = useQueryApplicationStageStat()
  const stageStat = stageStatResponse?.data

  const crumbs = useBreadcrumb()

  // Get list judges for multiselect
  const judgesResponse = useQueryGetJudgeList({})
  const judgeOptions: Option[] = useMemo(
    () =>
      judgesResponse?.data?.map((judge) => ({
        value: judge.id,
        label: buildUserMultiSelectLabelHelper(judge.name, judge.avatar)
      })) ?? [],
    [judgesResponse?.data]
  )

  // Filter state
  const filterForm = useForm<LoanApplicationScoreFilterValues>({
    resolver: zodResolver(loanApplicationScoreFilterSchema),
    defaultValues: {
      statuses: [],
      judgeIds: []
    }
  })
  const getFilter = useCallback(() => {
    const getWatchValue = (formKey: keyof LoanApplicationScoreFilterValues) => {
      return filterForm.watch(formKey)?.map((option) => option.value)
    }

    return {
      statuses: getWatchValue("statuses")?.map((status) =>
        status.toLowerCase()
      ),
      judgeIds: getWatchValue("judgeIds")
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

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0" />
          <h1 className="text-2xl font-semibold">Application</h1>
        </div>
      </div>

      <WorkspaceAdminApplicationStatusCard stageStat={stageStat} />

      <div className="mt-4">
        <Form {...filterForm}>
          <div className="flex gap-3 flex-wrap ">
            <div className="flex">
              <FormField
                control={filterForm.control}
                name="judgeIds"
                render={({ field }) => (
                  <MultiSelectRound
                    label="Judges"
                    subLabel="Users"
                    field={field}
                    options={judgeOptions}
                    labelHOC={(option, close) => (
                      <UserMultiSelectOption option={option} close={close} />
                    )}
                  />
                )}
              />
            </div>
            <div className="flex-1 flex">
              <FormField
                control={filterForm.control}
                name="statuses"
                render={({ field }) => (
                  <MultiSelectRound
                    label="Round"
                    subLabel="Select Application Round"
                    field={field}
                    options={ROUND_STATUS_OPTIONS}
                    labelHOC={(option, close) => (
                      <StatusRoundBadge round={roundOptionToStatus(option)}>
                        {capitalizeWords(option.label)} {close}
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
        </Form>
      </div>

      <DataTable
        tableContainerClassName="flex flex-col flex-1 overflow-hidden h-[85vh]"
        columns={workspaceAdminApplicationColumns}
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
