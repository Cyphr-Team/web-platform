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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { type StateType } from "@/types/common.type"
import { capitalizeWords } from "@/utils"
import { CheckIcon, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface IAutoCompleteInputProps<T extends FieldValues> {
  value: string
  onChange: (value: string) => void
  options: StateType[]
  emptyText?: string
  label: string
  control: Control<T>
  name: FieldPath<T>
  required?: boolean
  className?: string
}

export function AutoCompleteStates<T extends FieldValues>(
  props: IAutoCompleteInputProps<T>
) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const onSearch = (value: string) => {
    setSearchValue(value.toLowerCase())
  }

  useEffect(() => {
    if (!open && !!searchValue) {
      setSearchValue("")
    }
  }, [open, searchValue])

  const {
    value,
    options,
    emptyText,
    control,
    name,
    label,
    className,
    required,
    onChange
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-text-secondary">
            {label}
            {required ? <RequiredSymbol /> : null}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  className={cn(
                    "p-0 text-sm",
                    value === "" ? "text-text-placeholder" : ""
                  )}
                  name={name}
                  suffixIcon={
                    <ChevronDown
                      className={cn("size-4", open ? "rotate-180" : "")}
                    />
                  }
                  value={value || "Select state"}
                />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-72 p-0">
                <Command
                  filter={(value, search) => {
                    if (value.startsWith(search)) return 1

                    return 0
                  }}
                >
                  <CommandInput
                    className="h-9"
                    placeholder="Search state"
                    value={searchValue}
                    onValueChange={(value) => {
                      onSearch(value)
                    }}
                  />
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup className="h-60 overflow-auto">
                    {options.map((option) => {
                      return (
                        <CommandItem
                          key={option.id}
                          value={option.name}
                          onSelect={(currentValue) => {
                            field.onBlur()
                            field.onChange(capitalizeWords(currentValue))
                            onChange(currentValue)
                            setOpen(false)
                          }}
                        >
                          {option.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto size-4",
                              value === option.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
