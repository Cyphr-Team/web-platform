import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import useBoolean from "@/hooks/useBoolean"
import { cn } from "@/lib/utils"
import { parseAndValidateNumberOrUndefined } from "@/utils"
import { get } from "lodash"
import { ChevronDown } from "lucide-react"
import { useCallback } from "react"
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path
} from "react-hook-form"

const enum SCORECARD_FILTER_FIELDS_NAME {
  NUMBER_OF_SCORED = "numberOfScored",
  NUMBER_OF_ASSIGNED = "numberOfAssigned"
}

interface Props<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>
  className?: string
}

export function ScorecardFilterPopover<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(props: Props<TFieldValues, TName>) {
  const { field, className } = props
  const { value: open, setValue: setOpen } = useBoolean(false)

  const handleClear = useCallback(() => {
    field.onChange({
      [SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_SCORED]: undefined,
      [SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_ASSIGNED]: undefined
    })
    setOpen(false)
  }, [field, setOpen])

  const getAdditionLabel = (): string | null => {
    try {
      const numberOfScored = get(
        field.value,
        SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_SCORED
      )
      const numberOfAssigned = get(
        field.value,
        SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_ASSIGNED
      )

      if (numberOfScored >= 0) {
        return numberOfAssigned >= 0
          ? `: ${numberOfScored} of ${numberOfAssigned} scored` // Both values are 'number'
          : `: ${numberOfScored} scored` // Only 'numberOfScored' is 'number'
      }

      // Only assigned is a number
      if (numberOfAssigned >= 0) {
        return `: ${numberOfAssigned} assignee${
          numberOfAssigned > 1 ? "s" : ""
        }`
      }

      return null
    } catch (e) {
      // console.error("Something went wrong when showing the label scorecard", e)

      return null
    }
  }

  const additionLabel = getAdditionLabel()

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "h-10 rounded-full border border-input px-4 py-2 text-sm font-semibold text-slate-700",
              additionLabel && "border-slate-500"
            )}
            id={field.name}
            variant="ghost"
          >
            Scorecard Status
            {additionLabel}
            <ChevronDown className="ml-0.5 size-5 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="m-0 w-full rounded-lg p-0"
          side="bottom"
        >
          <div className="mt-1 flex w-fit items-center justify-between gap-2 p-4 text-sm">
            <Input
              className="w-20 focus-visible:ring-0"
              maxLength={2}
              min={0}
              name={SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_SCORED}
              type="text"
              value={field.value?.numberOfScored ?? ""}
              onChange={(e) => {
                const value = parseAndValidateNumberOrUndefined(
                  e.target.value,
                  2
                )

                e.preventDefault()
                field.onChange({
                  ...field.value,
                  [SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_SCORED]: value
                })
              }}
            />
            of
            <Input
              className="w-20 focus-visible:ring-0"
              maxLength={2}
              min={0}
              name={SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_ASSIGNED}
              type="text"
              value={field.value?.numberOfAssigned ?? ""}
              onChange={(e) => {
                const value = parseAndValidateNumberOrUndefined(
                  e.target.value,
                  2
                )

                field.onChange({
                  ...field.value,
                  [SCORECARD_FILTER_FIELDS_NAME.NUMBER_OF_ASSIGNED]: value
                })
              }}
            />
            scored
          </div>

          <Separator />
          <Button
            className="my-1.5 flex h-7 w-full justify-start rounded-none text-left text-sm font-normal text-slate-700 hover:text-red-600"
            type="reset"
            variant="ghost"
            onClick={handleClear}
          >
            Clear all values
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
