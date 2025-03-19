import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { type Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords } from "@/utils"
import { CalendarPlus, Trash } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { type UseFormReturn } from "react-hook-form"
import { StatusRoundBadge } from "../../../components/atoms/StatusRoundBadge"
import {
  buildUserMultiSelectLabelHelper,
  UserMultiSelectOption
} from "../../../components/atoms/UserMultiSelectOption"
import { AddFilterPopover } from "../../../components/molecules/filters/AddFilterPopover"
import { ScorecardFilterPopover } from "../../../components/molecules/filters/ScorecardFilterPopover"
import { useQueryGetJudgeList } from "../../../hooks/useQuery/useQueryGetJudgeList"
import { type LoanApplicationScoreFilterValues } from "../../../hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"

interface IFilter {
  filterForm: UseFormReturn<LoanApplicationScoreFilterValues>
}

const ROUND_STATUS_OPTIONS: Option<LoanApplicationStatus>[] = [
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

const enum FormFieldNames {
  SCORECARDS = "scorecards",
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

const ADD_FILTER_OPTIONS: Option<FilterOptions>[] = [
  { value: FilterOptions.CREATED_ON, label: "Created On", icon: CalendarPlus },
  {
    value: FilterOptions.SUBMITTED_ON,
    label: "Submitted On",
    icon: CalendarPlus
  }
]

export function Filter({ filterForm }: IFilter) {
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

  // Extended filters
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Option[]>(
    []
  )

  // Date filters
  const handleSetDate = (fieldName: FilterOptions, date?: Date) => {
    const startOfSelectedDate = date
      ? new Date(date.setHours(0, 0, 0, 0))
      : undefined

    if (fieldName) {
      filterForm.setValue(fieldName, startOfSelectedDate)
    }
  }

  const handleClickToDeleteFilter = (filterOptionName: FilterOptions) => () => {
    // Reset date filter
    const formField = filterOptionName

    if (formField) {
      filterForm.setValue(formField, undefined)
    }

    // Remove selected filter option
    setSelectedFilterOptions((prev) =>
      prev.filter((selectedOption) => selectedOption.value !== filterOptionName)
    )
  }

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

  const addFilterPopover =
    selectedFilterOptions.length !== ADD_FILTER_OPTIONS.length ? (
      <AddFilterPopover
        options={ADD_FILTER_OPTIONS.filter((option) => {
          return !selectedFilterOptions.some(
            (selectedOption) => selectedOption.value === option.value
          )
        })}
        setSelectedFilterOptions={setSelectedFilterOptions}
      />
    ) : null

  const renderCustomCalendarFooter = (filterOptionName: FilterOptions) =>
    function () {
      return (
        <tfoot className="custom-footer mb-1.5 h-7 w-full justify-start text-sm font-normal text-text-tertiary hover:text-red-600">
          <tr>
            <td>
              <Separator className="my-1.5" />
              <Button
                className="h-auto w-full cursor-pointer content-start gap-3 rounded-none p-1 hover:text-red-600"
                variant="ghost"
                onClick={handleClickToDeleteFilter(filterOptionName)}
              >
                <div className="flex w-full items-center justify-start">
                  <Trash className="mr-1 h-4" />
                  <span>Delete filter</span>
                </div>
              </Button>
            </td>
          </tr>
        </tfoot>
      )
    }

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <div className="flex">
          <FormField
            control={filterForm.control}
            name={FormFieldNames.SCORECARDS}
            render={({ field }) => {
              return <ScorecardFilterPopover field={field} />
            }}
          />
        </div>

        <FormField
          control={filterForm.control}
          name={FormFieldNames.JUDGE_IDS}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Judges"
              labelHOC={(option, close) => (
                <UserMultiSelectOption close={close} option={option} />
              )}
              options={judgeOptions}
              subLabel="Users"
            />
          )}
        />

        <FormField
          control={filterForm.control}
          name={FormFieldNames.STATUSES}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Round"
              labelHOC={(option, close) => (
                <StatusRoundBadge round={option.value}>
                  {capitalizeWords(option.label)} {close}
                </StatusRoundBadge>
              )}
              options={ROUND_STATUS_OPTIONS}
              subLabel="Select Application Round"
            />
          )}
        />

        {/* Render extended filters */}
        {ADD_FILTER_OPTIONS.map((option) => {
          const isShown = isIncludedExtendedFilter(option)

          return (
            <div key={option.value} className={cn("hidden", isShown && "flex")}>
              <FormField
                control={filterForm.control}
                name={option.value}
                render={({ field: { value, name } }) => (
                  <CalendarDatePicker
                    align="center"
                    className="w-full"
                    contentClassName={isShown ? "block" : "hidden"}
                    customFooter={renderCustomCalendarFooter(option.value)}
                    id={name}
                    placeholder=""
                    prefixLabel={option.label + (value ? ":" : "")}
                    triggerClassName={cn(
                      "rounded-full text-sm font-semibold",
                      value && "border-slate-500"
                    )}
                    value={value?.toString()}
                    onCustomClick={handleMagicClickFilter(option)}
                    onSelectDate={(date) => handleSetDate(option.value, date)}
                  />
                )}
              />
            </div>
          )
        })}

        {/** Add filters button */}
        {addFilterPopover}
      </div>
    </Form>
  )
}
