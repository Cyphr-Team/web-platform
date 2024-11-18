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
import { type Option } from "@/types/common.type"
import { CheckIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"

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

export function AutoCompleteUserEmail<T extends FieldValues>(
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
            {required ? <RequiredSymbol /> : null}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  className="text-sm"
                  prefixIcon={<Search className="w-5 text-muted-foreground" />}
                  style={{ textAlign: "left" }}
                  value={selected.label || "Select email..."}
                />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-82 p-0">
                <Command
                  filter={(value, search) => {
                    return value.startsWith(search) ? 1 : 0
                  }}
                >
                  <CommandInput
                    className="h-9"
                    placeholder="Search user"
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
                            "ml-auto size-4",
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
