import { Command as CommandPrimitive } from "cmdk"
import {
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues
} from "react-hook-form"

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
import { type Option } from "@/types/common.type"
import { ChevronDown, X } from "lucide-react"
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef
} from "react"
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
            className={cn(
              "rounded-full text-slate-700",
              !!field.value.length && "border-slate-500"
            )}
            id={field.name}
            variant="outline"
          >
            <span className="font-semibold">
              {label}
              {additionLabel}
            </span>

            <ChevronDown className="ml-0.5 size-5 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[244px] p-0">
          <Command>
            <div className="flex h-auto max-h-96 flex-col overflow-hidden">
              <div>
                <div className="p-4 pb-0">
                  <div className="overflow-hidden rounded-lg border border-slate-500 focus-within:shadow-lg">
                    <div
                      className={cn(
                        "w-full gap-2 p-3 py-2.5",
                        "flex max-h-24 flex-wrap overflow-auto overscroll-contain"
                      )}
                      onClick={focusInput}
                    >
                      {field.value.map(
                        (option: Option<OptionType>) =>
                          (
                            <div
                              key={option.value}
                              className="multi-selected group has-[.parent-border]:rounded-full has-[.parent-border]:border has-[.parent-border]:p-1"
                            >
                              {labelHOC?.(
                                option,
                                <Button
                                  className="ml-1 size-auto p-0"
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                  onClick={handleOptionClick(option)}
                                >
                                  <X className="size-3" strokeWidth={3} />
                                </Button>
                              )}
                            </div>
                          ) || option.label
                      )}

                      <div className="max-w-32">
                        <CommandPrimitive.Input
                          ref={searchInputRef}
                          className={cn(
                            "h-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                            "flex w-full p-0"
                          )}
                          placeholder="Search"
                          onKeyDown={handleSearchOnKeyDown}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 pb-1 text-xs font-semibold">
                  {subLabel ?? label}
                </div>
              </div>

              <CommandEmpty className="py-3 text-center text-sm">
                No result found.
              </CommandEmpty>

              <CommandList className="overflow-y-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    className="h-10 cursor-pointer gap-3 rounded-none px-4"
                    value={option.label}
                    onSelect={handleOptionClick(option)}
                  >
                    <Checkbox
                      checked={isSelected(option)}
                      className={cn(
                        "size-5 rounded-[3px] border-2 border-zinc-300",
                        "data-[state=checked]:border-none data-[state=checked]:bg-slate-600 data-[state=checked]:text-white",
                        "[&>span>svg>path]:stroke-[3]"
                      )}
                    />
                    {labelHOC ? labelHOC(option) : option.label}
                  </CommandItem>
                ))}
              </CommandList>
            </div>

            <Separator className="my-1.5" />

            <Button
              className="mb-1.5 h-7 w-full justify-start rounded-none px-4 text-sm font-normal text-text-tertiary"
              size="sm"
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
