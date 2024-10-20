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
  FormField,
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
import { CheckIcon, ChevronDown } from "lucide-react"
import { useState } from "react"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface IOption {
  label: string
  value: string
}

interface IAutoCompleteInputProps<T extends FieldValues> {
  value: string
  onChange: (value: string) => void
  options: IOption[]
  emptyText?: string
  label?: string
  control: Control<T>
  name: FieldPath<T>
  placeholder?: string
}

export function AutoCompleteInput<T extends FieldValues>(
  props: IAutoCompleteInputProps<T>
) {
  const [open, setOpen] = useState(false)
  const {
    value,
    options,
    emptyText,
    control,
    name,
    label,
    onChange,
    placeholder
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label ? (
            <FormLabel className="text-text-secondary">{label}</FormLabel>
          ) : null}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full px-3.5 justify-between",
                    !value && "text-muted-foreground",
                    "group-[.date-select-coupling]:rounded-r-none group-[.date-select-coupling]:justify-between"
                  )}
                  variant="outline"
                >
                  <p className="truncate font-normal">
                    {value
                      ? options.find((option) => option.value === value)?.label
                      : placeholder ?? "Select option..."}
                  </p>
                  <p className="ml-2 shrink-0 flex items-center">
                    <ChevronDown
                      className="text-muted-foreground"
                      height={20}
                      width={20}
                    />
                  </p>
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput className="h-9" placeholder="Search option..." />
                <CommandEmpty>{emptyText ?? "Not found."}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue)
                        setOpen(false)
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
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
      )}
    />
  )
}
