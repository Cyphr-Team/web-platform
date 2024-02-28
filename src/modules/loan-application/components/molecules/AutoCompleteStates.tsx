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
import { StateType } from "@/types/common.type"
import { CheckIcon, Search } from "lucide-react"
import { useState } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

interface IAutoCompleteInputProps<T extends FieldValues> {
  value: string
  onChange: (value: string) => void
  options: StateType[]
  emptyText?: string
  label: string
  control: Control<T>
  name: FieldPath<T>
  className?: string
}

export const AutoCompleteStates = <T extends FieldValues>(
  props: IAutoCompleteInputProps<T>
) => {
  const [open, setOpen] = useState(false)
  const {
    value,
    options,
    emptyText,
    control,
    name,
    label,
    className,
    onChange
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel className="text-text-secondary">{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  value={value || "Select state..."}
                  prefixIcon={<Search className="w-5 text-muted-foreground" />}
                />
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search state" className="h-9" />
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup className="h-60 w-72 overflow-auto">
                    {options.map((option) => {
                      return (
                        <CommandItem
                          key={option.id}
                          value={option.name}
                          onSelect={(currentValue) => {
                            onChange(currentValue)
                            setOpen(false)
                          }}
                        >
                          {option.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
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
