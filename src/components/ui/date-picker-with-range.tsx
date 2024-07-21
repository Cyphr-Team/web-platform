"use client"

import { addMonths, format } from "date-fns"
import * as React from "react"
import { HTMLAttributes, useCallback, useEffect, useState } from "react"
import * as z from "zod"
import {
  CaptionProps,
  DateRange,
  useDayPicker,
  useNavigation,
  useSelectRange
} from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { validFormat, validTimeRange } from "@/utils/date.utils.ts"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { FORMAT_DATE_MMM_D_Y } from "@/constants/date.constants.ts"

enum MONTH {
  PREVIOUS = -1,
  NEXT = 1,
  STAY = 0
}

const enum FIELDS_NAME {
  FROM = "from",
  TO = "to"
}

const dateSchema = z.object({
  [FIELDS_NAME.FROM]: z.string().refine(validFormat, "Invalid date"),
  [FIELDS_NAME.TO]: z
    .string()
    .refine(validFormat, "Invalid date")
    .refine((value) => validTimeRange(value, new Date()), "Invalid date")
})

type DateSchema = z.infer<typeof dateSchema>

interface CalendarCaptionProps extends CaptionProps {
  setDateRange: (range: DateRange) => void
}

function CalendarCaption({ displayMonth, setDateRange }: CalendarCaptionProps) {
  const {
    classNames: { caption, nav_button_previous, nav_button_next }
  } = useDayPicker()
  const { selected } = useSelectRange()
  const { goToMonth } = useNavigation()

  const handleGoToMonth = useCallback(
    (monthIndex: MONTH | Date) => () => {
      if (typeof monthIndex === "number") {
        goToMonth(addMonths(displayMonth, monthIndex))
      } else {
        goToMonth(monthIndex)
      }
    },
    [goToMonth, displayMonth]
  )

  const form = useForm<DateSchema>({
    resolver: zodResolver(dateSchema),
    mode: "onBlur",
    defaultValues: {
      [FIELDS_NAME.FROM]: selected?.from
        ? format(selected.from, FORMAT_DATE_MMM_D_Y)
        : "",
      [FIELDS_NAME.TO]: selected?.to
        ? format(selected.to, FORMAT_DATE_MMM_D_Y)
        : ""
    }
  })

  const handleOnBlur = useCallback(
    (fieldName: FIELDS_NAME) => async () => {
      const validInput = await form.trigger()
      if (!validInput) return

      const formValues = {
        [FIELDS_NAME.FROM]: new Date(form.watch(FIELDS_NAME.FROM)),
        [FIELDS_NAME.TO]: new Date(form.watch(FIELDS_NAME.TO))
      }

      if (
        !validTimeRange(
          formValues[FIELDS_NAME.FROM],
          formValues[FIELDS_NAME.TO]
        )
      ) {
        form.setError(
          fieldName,
          { message: "Invalid date range" },
          { shouldFocus: true }
        )
        return
      }

      setDateRange(formValues)
      goToMonth(formValues[fieldName])
    },
    [form, setDateRange, goToMonth]
  )

  const handleEnter = useCallback(
    (fieldName: FIELDS_NAME) =>
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return
        // execute the function
        handleOnBlur(fieldName)()
      },
    [handleOnBlur]
  )

  const watchFieldError = useCallback(
    (fieldName: FIELDS_NAME) => ({
      isError: form.formState.errors[fieldName] !== undefined,
      message: form.formState.errors[fieldName]?.message
    }),
    [form]
  )

  useEffect(() => {
    if (!selected?.from || !selected.to) return
    form.setValue(FIELDS_NAME.FROM, format(selected.from, FORMAT_DATE_MMM_D_Y))
    form.setValue(FIELDS_NAME.TO, format(selected.to, FORMAT_DATE_MMM_D_Y))
  }, [selected, form])

  return (
    <div className="flex flex-col">
      <div className="flex">
        <TooltipProvider>
          <Form {...form}>
            <Tooltip open={watchFieldError(FIELDS_NAME.FROM).isError}>
              <TooltipTrigger>
                <FormField
                  control={form.control}
                  name={FIELDS_NAME.FROM}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="size-11/12"
                          wrapperClassName="w-32"
                          onFocus={handleGoToMonth(
                            selected?.from ?? MONTH.STAY
                          )}
                          {...field}
                          onBlur={handleOnBlur(FIELDS_NAME.FROM)}
                          onKeyDown={handleEnter(FIELDS_NAME.FROM)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TooltipTrigger>
              <TooltipContent side="left">
                {watchFieldError(FIELDS_NAME.FROM).message}
              </TooltipContent>
            </Tooltip>
            <Tooltip open={watchFieldError(FIELDS_NAME.TO).isError}>
              <TooltipTrigger>
                <FormField
                  control={form.control}
                  name={FIELDS_NAME.TO}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="size-11/12"
                          wrapperClassName="w-32"
                          onFocus={handleGoToMonth(selected?.to ?? MONTH.STAY)}
                          {...field}
                          onBlur={handleOnBlur(FIELDS_NAME.TO)}
                          onKeyDown={handleEnter(FIELDS_NAME.TO)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                {watchFieldError(FIELDS_NAME.TO).message}
              </TooltipContent>
            </Tooltip>
          </Form>
        </TooltipProvider>
      </div>
      <div className={cn("mt-2", caption)}>
        <span>{format(displayMonth, "MMM yyy")}</span>
        <div className="flex">
          <ChevronLeft
            className={cn(nav_button_previous, "cursor-pointer")}
            onClick={handleGoToMonth(MONTH.PREVIOUS)}
          />
          <ChevronRight
            className={cn(nav_button_next, "cursor-pointer")}
            onClick={handleGoToMonth(MONTH.NEXT)}
          />
        </div>
      </div>
    </div>
  )
}

type DatePickerWithRangeProps = HTMLAttributes<HTMLDivElement> & {
  date?: {
    from?: Date
    to?: Date
    selectedTimeRange?: string
  }
  disabled?: {
    from?: Date
    to?: Date
  }
  setDate: (range?: DateRange) => void
}

export function DatePickerWithRange({
  className,
  date,
  disabled,
  setDate
}: DatePickerWithRangeProps) {
  const [state, setState] = useState<DateRange>(() => ({
    from: date?.from,
    to: date?.to
  }))

  const onDateChange = useCallback(
    (range?: DateRange) => range && setState(range),
    []
  )

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      // handle popover close
      if (!isOpen) {
        setDate(state)
      }
    },
    [state, setDate]
  )

  const renderCaption = useCallback(
    (props: CaptionProps) => (
      <CalendarCaption setDateRange={onDateChange} {...props} />
    ),
    [onDateChange]
  )

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal px-3.5",
              !date && "text-muted-foreground",
              "group-[.date-select-coupling]:rounded-l-none group-[.date-select-coupling]:border-l-0 group-[.date-select-coupling]:justify-between"
            )}
          >
            <CalendarIcon
              className={cn(
                "mr-2 h-4 w-4 order-0 text-muted-foreground",
                "group-[.date-select-coupling]:order-1 group-[.date-select-coupling]:mr-0"
              )}
            />
            <div>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  <>{format(date.from, "LLL dd, y")} - Pick to date</>
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={state.to}
            selected={state}
            onSelect={onDateChange}
            showOutsideDays={false}
            disabled={(date) =>
              (disabled?.from && date < disabled.from) ||
              (disabled?.to && date > disabled.to) ||
              date > new Date() ||
              date < new Date("1900-01-01")
            }
            classNames={{
              root: "select-none",
              caption: "flex justify-between pt-1 relative items-center",
              nav_button_previous: "relative",
              nav_button_next: "relative"
            }}
            components={{
              Caption: renderCaption
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
