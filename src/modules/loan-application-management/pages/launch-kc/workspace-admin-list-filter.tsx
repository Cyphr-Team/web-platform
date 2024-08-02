import { DataTable } from "@/components/ui/data-table"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { Option, SortOrder } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState, SortingState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { CalendarPlus, Search, Trash } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { StatusRoundBadge } from "../../components/atoms/StatusRoundBadge"
import {
  buildUserMultiSelectLabelHelper,
  UserMultiSelectOption
} from "../../components/atoms/UserMultiSelectOption"
import { WorkspaceAdminApplicationStatusCard } from "../../components/atoms/WorkspaceAdminApplicationStatusCard"
import { workspaceAdminApplicationColumns } from "../../components/table/applications-scores/workspace-admin-application-score-columns"
import { useQueryApplicationStageStat } from "../../hooks/useQuery/useQueryApplicationStageStat"
import { useQueryGetJudgeList } from "../../hooks/useQuery/useQueryGetJudgeList"
import {
  loanApplicationScoreFilterSchema,
  LoanApplicationScoreFilterValues,
  useQueryListPaginatedLoanApplicationScoreGroupByApplicationId
} from "../../hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"
import { AddFilterPopover } from "../../components/molecules/filters/AddFilterPopover"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

const enum FormFieldNames {
  JUDGE_IDS = "judgeIds",
  STATUSES = "statuses",
  SEARCH = "search",
  CREATED_ON = "createdOn",
  SUBMITTED_ON = "submittedOn"
}

const enum FilterOptions {
  CREATED_ON = "createdOn",
  SUBMITTED_ON = "submittedOn"
}

const ADD_FILTER_OPTIONS: Option[] = [
  { value: FilterOptions.CREATED_ON, label: "Created On", icon: CalendarPlus },
  {
    value: FilterOptions.SUBMITTED_ON,
    label: "Submitted On",
    icon: CalendarPlus
  }
]

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
      judgeIds: [],
      createdOn: undefined,
      submittedOn: undefined
    }
  })

  const getFilter = useCallback(() => {
    const mapToLowerCase = (options?: Option[]) =>
      options?.map((item) => item.value.toLowerCase())

    return {
      statuses: mapToLowerCase(filterForm.watch(FormFieldNames.STATUSES)),
      judgeIds: mapToLowerCase(filterForm.watch(FormFieldNames.JUDGE_IDS)),
      createdOn: filterForm.watch(FormFieldNames.CREATED_ON),
      submittedOn: filterForm.watch(FormFieldNames.SUBMITTED_ON)
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

  // Extended filters
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Option[]>(
    []
  )

  // Date filters
  const handleSetDate = (fieldName: FilterOptions, date?: Date) => {
    const formField = fieldName as keyof LoanApplicationScoreFilterValues
    const startOfSelectedDate = date
      ? new Date(date.setHours(0, 0, 0, 0))
      : undefined
    if (formField) {
      filterForm.setValue(formField, startOfSelectedDate)
    }
  }

  const handleClickToDeleteFilter = (filterOptionName: FilterOptions) => () => {
    // Reset date filter
    const formField = filterOptionName as keyof LoanApplicationScoreFilterValues
    if (formField) {
      filterForm.setValue(formField, undefined)
    }

    // Remove selected filter option
    setSelectedFilterOptions((prev) =>
      prev.filter((selectedOption) => selectedOption.value !== filterOptionName)
    )
  }

  const renderCustomCalendarFooter =
    (filterOptionName: FilterOptions) => () => (
      <tfoot className="custom-footer hover:text-red-600 mb-1.5 h-7 w-full text-sm font-normal justify-start text-text-tertiary">
        <tr>
          <td>
            <Separator className="my-1.5" />
            <Button
              className="w-full h-auto content-start cursor-pointer gap-3 px-1 py-1 rounded-none hover:text-red-600"
              variant="ghost"
              onClick={handleClickToDeleteFilter(filterOptionName)}
            >
              <div className="w-full flex justify-start items-center">
                <Trash className="h-4 mr-1" />
                <span>Delete filter</span>
              </div>
            </Button>
          </td>
        </tr>
      </tfoot>
    )

  /**
   * Handle magic click filter from table column
   */
  const isIncludedExtendedFilter = useCallback(
    (option: Option) => {
      return selectedFilterOptions.some(
        (selectedOption) => selectedOption.value === option.value
      )
    },
    [selectedFilterOptions]
  )

  const handleMagicClickFilter = (option: Option) => () => {
    if (!isIncludedExtendedFilter(option)) {
      setSelectedFilterOptions((pre) => [...pre, option])
    }
  }

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
          <Breadcrumbs breads={crumbs} className="px-0 mb-3" />
          <h1 className="text-2xl font-semibold">Application</h1>
        </div>
      </div>

      <WorkspaceAdminApplicationStatusCard stageStat={stageStat} />

      <div className="mt-4">
        <Form {...filterForm}>
          <div className="grid xl:grid-cols-4 gap-4">
            <div className="col-span-3 py-1 flex gap-3 overflow-x-auto">
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

              <div className="flex">
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

              {/* Render extended filters */}
              {ADD_FILTER_OPTIONS.map((option) => {
                const selectedFilterOptionName =
                  option.value as keyof LoanApplicationScoreFilterValues
                const filterOption = option.value as FilterOptions
                const isShown = isIncludedExtendedFilter(option)

                return (
                  <div
                    key={option.value}
                    className={cn("hidden", isShown && "flex")}
                  >
                    <FormField
                      control={filterForm.control}
                      name={selectedFilterOptionName}
                      render={({ field: { value, name } }) => (
                        <CalendarDatePicker
                          onCustomClick={handleMagicClickFilter(option)}
                          id={name}
                          value={value?.toString()}
                          onSelectDate={(date) =>
                            handleSetDate(filterOption, date)
                          }
                          customFooter={renderCustomCalendarFooter(
                            filterOption
                          )}
                          className="w-full"
                          triggerClassName={cn(
                            "rounded-full font-semibold text-sm",
                            value && "border-slate-500"
                          )}
                          contentClassName={isShown ? "block" : "hidden"}
                          prefixLabel={option.label + `${value ? ":" : ""}`}
                          placeholder=""
                          align="center"
                        />
                      )}
                    />
                  </div>
                )
              })}

              {/** Add filters button */}
              <AddFilterPopover
                className="flex"
                options={ADD_FILTER_OPTIONS.filter((option) => {
                  return !selectedFilterOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  )
                })}
                setSelectedFilterOptions={setSelectedFilterOptions}
              />
            </div>

            <div className="flex-1 flex-shrink-0 min-w-[200px] mt-auto  py-1">
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
        isFilterView
        tableContainerClassName="flex flex-col flex-1 h-[85vh]"
        columns={workspaceAdminApplicationColumns}
        isLoading={isFetching}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        manualSorting
      />
    </div>
  )
}
