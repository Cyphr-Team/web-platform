import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext
} from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Option } from "@/types/common.type"
import { Check, ChevronDown } from "lucide-react"
import { ReactNode, useCallback, useEffect, useState } from "react"

export function MultiSelect<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  options,
  name,
  field,
  label,
  prefixIcon,
  defaultValue
}: {
  options: Option[]
  name: string
  field: ControllerRenderProps<TFieldValues, TName>
  label?: string
  prefixIcon?: ReactNode
  defaultValue?: Option
}) {
  const { getValues, setValue } = useFormContext()
  const [loadedOptions, setLoadedOptions] = useState<Option[]>([])
  const [searchValue, setSearchValue] = useState("")

  const onSearch = useCallback((value: string) => {
    setSearchValue(value.toLowerCase())
  }, [])

  useEffect(() => {
    if (searchValue.length) {
      setLoadedOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchValue)
        )
      )
    } else {
      setLoadedOptions(options)
    }
  }, [options, searchValue])

  const handleOptionClick = (option: Option) => {
    if (option.value === defaultValue?.value) {
      setValue(name, [defaultValue])
    } else {
      const selected = getValues(name).filter(
        (select: Option) => select.value !== defaultValue?.value
      )
      const isInclude = selected.some(
        (select: Option) => select.value === option.value
      )

      if (isInclude) {
        setValue(
          name,
          selected.filter((select: Option) => select.value !== option.value)
        )
      } else {
        setValue(name, [...selected, option])
      }
    }
  }

  const isSelected = (option: Option) => {
    return (
      field.value.findIndex((select: Option) => select.value === option.value) >
      -1
    )
  }

  return (
    <FormItem className="flex flex-col flex-1 md:flex-none">
      {label && <FormLabel>{label}</FormLabel>}

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "min-w-[200px] w-full md:w-[300px] px-3.5",
                !field.value && "text-muted-foreground"
              )}
            >
              {prefixIcon}
              <div className="flex justify-between flex-1 min-w-0">
                <p className="truncate font-normal">
                  {field.value.length > 0
                    ? field.value.map((v: Option) => v.label).join(", ")
                    : "All"}
                </p>
                <p className="ml-2 shrink-0 flex items-center">
                  {!!field.value.length && <span>({field.value.length})</span>}
                  <ChevronDown className="ml-0.5 h-5 w-5 opacity-50" />
                </p>
              </div>
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent
          className="w-full md:w-[300px] p-0"
          onCloseAutoFocus={() => setSearchValue("")}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              className="h-9"
              onValueChange={(value) => {
                onSearch(value)
              }}
            />

            <CommandEmpty>No result found.</CommandEmpty>

            <CommandGroup className="h-56 overflow-scroll">
              {loadedOptions.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    handleOptionClick(option)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      isSelected(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
