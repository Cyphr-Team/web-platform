import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  FormFieldNames,
  type LoanApplicationFilterValues
} from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateLoanApplication"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { type Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { snakeCaseToText } from "@/utils"
import { CalendarPlus, Trash } from "lucide-react"
import { useCallback, useState } from "react"
import { type UseFormReturn } from "react-hook-form"
import { AddFilterPopover } from "../../components/molecules/filters/AddFilterPopover"

interface IFilter {
  filterForm: UseFormReturn<LoanApplicationFilterValues>
}

const STATUS_OPTIONS: Option<LoanApplicationStatus>[] = [
  {
    value: LoanApplicationStatus.DRAFT,
    label: "Draft"
  },
  { value: LoanApplicationStatus.READY_FOR_REVIEW, label: "Ready for review" },
  { value: LoanApplicationStatus.SUBMITTED, label: "Processing" },
  { value: LoanApplicationStatus.IN_REVIEW, label: "In review" },
  { value: LoanApplicationStatus.APPROVED, label: "Approved" },
  { value: LoanApplicationStatus.DENIED, label: "Denied" }
]

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
    }

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name={FormFieldNames.STATUS}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Status"
              labelHOC={(option, close) => (
                <Badge
                  isDot
                  className="capitalize"
                  variant="soft"
                  variantColor={getBadgeVariantByStatus(option.value)}
                >
                  {snakeCaseToText(option.label)}
                  {close}
                </Badge>
              )}
              options={STATUS_OPTIONS}
              subLabel="Select Application Status"
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
                    /* eslint-disable-next-line @typescript-eslint/no-useless-template-literals */
                    prefixLabel={option.label + `${value ? ":" : ""}`}
                    triggerClassName={cn(
                      "rounded-full font-semibold text-sm",
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
