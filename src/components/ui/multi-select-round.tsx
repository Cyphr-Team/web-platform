import { Command as CommandPrimitive } from "cmdk"
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { FormItem, FormMessage } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Option } from "@/types/common.type"
import { ChevronDown, X } from "lucide-react"
import { KeyboardEvent, ReactNode, useCallback, useEffect, useRef } from "react"
import { Checkbox } from "./checkbox"
import { Separator } from "./separator"

export function MultiSelectRound<
  OptionType extends string = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  options,
  field,
  label,
  subLabel,
  labelHOC
}: {
  options: Option<OptionType>[]
  field: ControllerRenderProps<TFieldValues, TName>
  label: string
  subLabel?: string
  labelHOC?: (option: Option<OptionType>, close?: ReactNode) => ReactNode
}) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const isSelected = useCallback(
    (option: Option<OptionType>) => {
      return field.value.some(
        (select: Option<OptionType>) => select.value === option.value
      )
    },
    [field.value]
  )

  const handleOptionClick = useCallback(
    (option: Option<OptionType>) => () => {
      if (isSelected(option)) {
        field.onChange(
          field.value.filter(
            (select: Option<OptionType>) => select.value !== option.value
          )
        )
      } else {
        field.onChange([...field.value, option])
      }
    },
    [field, isSelected]
  )

  const handleSearchOnKeyDown = useCallback(
    (searchOnKeyDownEvent: KeyboardEvent<HTMLDivElement>) => {
      const inputValueLength = searchInputRef.current?.value?.length ?? 0
      const allowDelete =
        !inputValueLength &&
        !!field.value.length &&
        (searchOnKeyDownEvent.key === "Backspace" ||
          searchOnKeyDownEvent.key === "Delete")

      if (!allowDelete) return

      const currentValue = field.value

      field.onChange(currentValue.slice(0, -1))
    },
    [field]
  )

  const clearAllValue = useCallback(() => {
    field.onChange([])
  }, [field])

  const focusInput = useCallback(() => {
    searchInputRef.current?.scrollIntoView()
    searchInputRef.current?.focus()
  }, [])

  const additionLabel = field.value.length > 0 && (
    <>
      :{" "}
      {field.value.length === options.length ? "All" : `+${field.value.length}`}
    </>
  )

  useEffect(() => {
    focusInput()
  }, [field.value, focusInput])

  return (
    <FormItem className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={field.name}
            variant="outline"
            className={cn(
              "rounded-full text-slate-700",
              !!field.value.length && "border-slate-500"
            )}
          >
            <span className="font-semibold">
              {label}
              {additionLabel}
            </span>

            <ChevronDown className="ml-0.5 h-5 w-5 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[244px] p-0">
          <Command>
            <div className="flex flex-col h-auto max-h-96 overflow-hidden">
              <div>
                <div className="p-4 pb-0">
                  <div className="border-slate-500 border focus-within:shadow-lg rounded-lg overflow-hidden">
                    <div
                      className={cn(
                        "w-full gap-2 p-3 py-2.5",
                        "flex flex-wrap max-h-24 overflow-auto overscroll-contain"
                      )}
                      onClick={focusInput}
                    >
                      {field.value.map(
                        (option: Option<OptionType>) =>
                          (
                            <div
                              key={option.value}
                              className="group multi-selected has-[.parent-border]:border has-[.parent-border]:rounded-full has-[.parent-border]:p-1"
                            >
                              {labelHOC?.(
                                option,
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-1 w-auto h-auto p-0"
                                  type="button"
                                  onClick={handleOptionClick(option)}
                                >
                                  <X className="w-3 h-3" strokeWidth={3} />
                                </Button>
                              )}
                            </div>
                          ) || option.label
                      )}

                      <div className="max-w-32">
                        <CommandPrimitive.Input
                          placeholder="Search"
                          ref={searchInputRef}
                          onKeyDown={handleSearchOnKeyDown}
                          className={cn(
                            "bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                            "flex h-6 p-0 w-full text-sm placeholder:text-muted-foreground"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 font-semibold text-xs py-2 pb-1">
                  {subLabel ?? label}
                </div>
              </div>

              <CommandEmpty>No result found.</CommandEmpty>

              <CommandList className="overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    className="cursor-pointer gap-3 px-4 h-10 rounded-none"
                    value={option.label}
                    key={option.value}
                    onSelect={handleOptionClick(option)}
                  >
                    <Checkbox
                      className={cn(
                        "border-2 border-zinc-300 rounded-[3px] w-5 h-5",
                        "data-[state=checked]:bg-slate-600 data-[state=checked]:border-none data-[state=checked]:text-white",
                        "[&>span>svg>path]:stroke-[3]"
                      )}
                      checked={isSelected(option)}
                    />
                    {labelHOC ? labelHOC(option) : option.label}
                  </CommandItem>
                ))}
              </CommandList>
            </div>

            <Separator className="my-1.5" />

            <Button
              size="sm"
              className="mb-1.5 h-7 w-full text-sm font-normal justify-start text-text-tertiary px-4 rounded-none"
              variant="ghost"
              onClick={clearAllValue}
            >
              Clear selection
            </Button>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
