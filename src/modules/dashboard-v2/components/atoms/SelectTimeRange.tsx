import {
  timeRangeExtendedOptions,
  timeRangeOptions
} from "@/constants/time-range-filter.constants"
import { AutoCompleteInput } from "@/shared/organisms/form/AutocompleteInput"
import {
  type TimeRangeFilterValue,
  type TimeRangeValue
} from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { useFormContext } from "react-hook-form"

export function SelectTimeRange({
  customOnChange,
  showExtendedTimeRange = false
}: {
  customOnChange?: (value?: TimeRangeValue) => void
  showExtendedTimeRange?: boolean
}) {
  const { setValue, control, watch } = useFormContext<TimeRangeFilterValue>()

  const onChangeTimeRange = (value: string) => {
    const timeRangeDate = getTimeRangeDates(value as TimeRangeValue)

    setValue("timeRange", {
      selectedTimeRange: value,
      from: timeRangeDate.from,
      to: timeRangeDate.to
    })
    customOnChange?.(value as TimeRangeValue)
  }

  const name = "timeRange"
  const value = watch(name)

  return (
    <div className="w-[200px]">
      <AutoCompleteInput
        control={control}
        name={name}
        options={
          showExtendedTimeRange ? timeRangeExtendedOptions : timeRangeOptions
        }
        placeholder="Select time range.."
        value={value.selectedTimeRange ?? ""}
        onChange={onChangeTimeRange}
      />
    </div>
  )
}
