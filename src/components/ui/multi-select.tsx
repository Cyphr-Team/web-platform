import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext
} from "react-hook-form"

import { cn } from "@/lib/utils"
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
import { Check, ChevronsUpDown } from "lucide-react"
import { Option } from "@/types/common.type"

export function MultiSelect<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  options,
  name,
  field,
  label
}: {
  options: Option[]
  name: string
  field: ControllerRenderProps<TFieldValues, TName>
  label: string
}) {
  const { getValues, setValue } = useFormContext()

  const handleOptionClick = (option: Option) => {
    const selected = getValues(name)
    const isInclude =
      selected.findIndex((select: Option) => select.value === option.value) > -1

    if (isInclude) {
      setValue(
        name,
        selected.filter((select: Option) => select.value !== option.value)
      )
    } else {
      setValue(name, [...selected, option])
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
      <FormLabel>{label}</FormLabel>

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "min-w-[200px] w-full md:w-[300px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              <p className="truncate">
                {field.value.length > 0
                  ? field.value.map((v: Option) => v.label).join(", ")
                  : "All"}
              </p>
              <p className="ml-2 shrink-0 flex items-center">
                {!!field.value.length && <span>({field.value.length})</span>}
                <ChevronsUpDown className="ml-0.5 h-4 w-4 opacity-50" />
              </p>
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-full md:w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />

            <CommandEmpty>No result found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
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
