import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { type Option } from "@/types/common.type"
import { CalendarPlus, Trash } from "lucide-react"
import { type ReactNode, useCallback, useState } from "react"
import { type UseFormReturn } from "react-hook-form"
import { MultiSelectRound } from "@/components/ui/multi-select-round.tsx"
import { type LoanApplicationStatus } from "@/types/loan-application.type.ts"
import { AddFilterPopover } from "@/modules/loan-application-management/components/molecules/filters/AddFilterPopover.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { type LoanApplicationFilterValues } from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateLoanApplication.ts"
import {
  allStatuses,
  getBadgeVariantByStatus,
  getStatusDisplayName
} from "@/modules/loan-application/capital-collab/services/index.ts"

interface IFilter {
  filterForm: UseFormReturn<LoanApplicationFilterValues>
}

const enum FormFieldNames {
  Status = "status",
  Search = "search"
}

const enum FilterOptions {
  CreatedOn = "createdOn",
  SubmittedOn = "submittedOn"
}

const STATUS_OPTIONS: Option<LoanApplicationStatus>[] = allStatuses.map(
  (status) => ({
    value: status,
    label: getStatusDisplayName(status)
  })
)

const ADD_FILTER_OPTIONS: Option<FilterOptions>[] = [
  { value: FilterOptions.CreatedOn, label: "Created On", icon: CalendarPlus },
  {
    value: FilterOptions.SubmittedOn,
    label: "Submitted On",
    icon: CalendarPlus
  }
]

const renderCustomCalendarFooter = (filterCallback: () => void) => (
  <tfoot className="custom-footer mb-1.5 h-7 w-full justify-start text-sm font-normal text-text-tertiary hover:text-red-600">
    <tr>
      <td>
        <Separator className="my-1.5" />
        <Button
          className="h-auto w-full cursor-pointer content-start gap-3 rounded-none p-1 hover:text-red-600"
          variant="ghost"
          onClick={filterCallback}
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

export function ApplicationsFilter({ filterForm }: IFilter) {
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

  const StatusMultiSelectComponent = useCallback(
    (option: Option<LoanApplicationStatus>, close: ReactNode) => (
      <Badge
        className="whitespace-nowrap"
        variant="soft"
        variantColor={getBadgeVariantByStatus(option.value)}
      >
        {option.label}
        {close}
      </Badge>
    ),
    []
  )

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Status}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Status"
              labelHOC={(option, close) =>
                StatusMultiSelectComponent(option, close)
              }
              options={STATUS_OPTIONS}
              subLabel="Select status"
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
                    customFooter={() =>
                      renderCustomCalendarFooter(
                        handleClickToDeleteFilter(option.value)
                      )
                    }
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
