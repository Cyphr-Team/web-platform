import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import {
  ErrorMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { Option } from "@/types/common.type"
import { CheckIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

interface IAutoCompleteInputProps<T extends FieldValues> {
  value: Option
  options: Option[]
  emptyText?: string
  label: string
  control: Control<T>
  name: FieldPath<T>
  required?: boolean
  className?: string
  error?: string
}

export const AutoCompleteUserEmail = <T extends FieldValues>(
  props: IAutoCompleteInputProps<T>
) => {
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
    value: selected,
    options,
    emptyText,
    control,
    name,
    label,
    className,
    required,
    error
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-text-secondary">
            {label}
            {required && <RequiredSymbol />}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  value={selected.label || "Select email..."}
                  className="text-sm"
                  prefixIcon={<Search className="w-5 text-muted-foreground" />}
                  style={{ textAlign: "left" }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-82 p-0" align="start">
                <Command
                  filter={(value, search) => {
                    return value.startsWith(search) ? 1 : 0
                  }}
                >
                  <CommandInput
                    placeholder="Search user"
                    className="h-9"
                    value={searchValue}
                    onValueChange={(searchInput) => {
                      onSearch(searchInput)
                    }}
                  />
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup
                    className="h-60 overflow-auto"
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {options?.map((option) => (
                      <CommandItem
                        key={option.label}
                        value={option.label}
                        onSelect={() => {
                          field.onBlur()
                          field.onChange(option)
                          setOpen(false)
                        }}
                      >
                        {option.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selected.value === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </FormItem>
      )}
    />
  )
}
