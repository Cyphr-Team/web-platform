import { timeRangeOptions } from "@/constants/time-range-filter.constants"
import { AutoCompleteInput } from "@/shared/organisms/form/AutocompleteInput"
import { TimeRangeFilterValue, TimeRangeValue } from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { useFormContext } from "react-hook-form"

export function SelectTimeRange({
  customOnChange
}: {
  customOnChange?: (value?: TimeRangeValue) => void
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

  const name = "timeRange.selectedTimeRange"
  const value = watch(name)

  return (
    <div className="w-[200px]">
      <AutoCompleteInput
        control={control}
        name={name}
        options={timeRangeOptions}
        onChange={onChangeTimeRange}
        value={value ?? ""}
        placeholder="Select time range.."
      />
    </div>
  )
}
