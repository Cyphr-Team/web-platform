import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords } from "@/utils"
import { CalendarPlus, Trash } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { StatusRoundBadge } from "../../../components/atoms/StatusRoundBadge"
import {
  buildUserMultiSelectLabelHelper,
  UserMultiSelectOption
} from "../../../components/atoms/UserMultiSelectOption"
import { AddFilterPopover } from "../../../components/molecules/filters/AddFilterPopover"
import { ScorecardFilterPopover } from "../../../components/molecules/filters/ScorecardFilterPopover"
import { useQueryGetJudgeList } from "../../../hooks/useQuery/useQueryGetJudgeList"
import { LoanApplicationScoreFilterValues } from "../../../hooks/useQuery/useQueryListPaginatedLoanApplicationScoreGroupByApplicationId"

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

        <FormField
          control={filterForm.control}
          name={FormFieldNames.STATUSES}
          render={({ field }) => (
            <MultiSelectRound
              label="Round"
              subLabel="Select Application Round"
              field={field}
              options={ROUND_STATUS_OPTIONS}
              labelHOC={(option, close) => (
                <StatusRoundBadge round={option.value}>
                  {capitalizeWords(option.label)} {close}
                </StatusRoundBadge>
              )}
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
                    onCustomClick={handleMagicClickFilter(option)}
                    id={name}
                    value={value?.toString()}
                    onSelectDate={(date) => handleSetDate(option.value, date)}
                    customFooter={renderCustomCalendarFooter(option.value)}
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
        {addFilterPopover}
      </div>
    </Form>
  )
}
