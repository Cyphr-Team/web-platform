import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { TIME_PERIODS } from "@/constants/date.constants"
import { cn } from "@/lib/utils"

interface Props {
  onChangeTimePeriod: (timePeriod: string) => void
  timePeriod: string
  timePeriods?: string[]
  className?: string
}

export const TimePeriodsSelection: React.FC<Props> = ({
  onChangeTimePeriod,
  timePeriod,
  timePeriods = TIME_PERIODS,
  className
}) => {
  return (
    <Select
      value={timePeriod}
      onValueChange={(value) => {
        onChangeTimePeriod(value)
      }}
    >
      <SelectTrigger
        className={cn(
          "w-28 pr-1.5 font-medium capitalize focus:ring-0",
          className
        )}
      >
        <SelectValue>{timePeriod}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {timePeriods.map((option, id: number) => (
          <SelectItem
            key={`${option}-${id}`}
            className="capitalize"
            value={option ?? ""}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
