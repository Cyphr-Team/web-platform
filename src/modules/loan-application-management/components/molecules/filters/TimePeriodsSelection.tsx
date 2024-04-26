import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const TIME_PERIODS = ["monthly", "weekly", "daily"]

type Props = {
  onChangeTimePeriod: (timePeriod: string) => void
  timePeriod: string
}

export const TimePeriodsSelection: React.FC<Props> = ({
  onChangeTimePeriod,
  timePeriod
}) => {
  return (
    <Select
      value={timePeriod}
      onValueChange={(value) => {
        onChangeTimePeriod(value)
      }}
    >
      <SelectTrigger className="pr-1.5 focus:ring-0 w-28 font-medium capitalize">
        <SelectValue>{timePeriod}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {TIME_PERIODS.map((option, id: number) => (
          <SelectItem
            className="capitalize"
            key={`${option}-${id}`}
            value={option ?? ""}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
