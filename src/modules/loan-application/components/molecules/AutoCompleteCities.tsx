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
import { CityType } from "@/types/common.type"
import { CheckIcon, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

interface IAutoCompleteInputProps<T extends FieldValues> {
  value: string
  onChange: (value: string) => void
  options: CityType[]
  emptyText?: string
  label: string
  className?: string
  required?: boolean
  control: Control<T>
  name: FieldPath<T>
}

export const AutoCompleteCities = <T extends FieldValues>(
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
  const [loadedOptions, setLoadedOptions] = useState<CityType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentPage(1)
  }, [options])

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true)
      const fetchedOptions = options.slice(
        (currentPage - 1) * 20,
        currentPage * 20
      )
      if (currentPage === 1) {
        setLoadedOptions(fetchedOptions)
      } else {
        setLoadedOptions((prevOptions) => [...prevOptions, ...fetchedOptions])
      }
      setIsLoading(false)
    }

    loadOptions()
  }, [currentPage, options])

  useEffect(() => {
    if (searchValue.length) {
      setLoadedOptions(
        options.filter((option) =>
          option.name.toLowerCase().includes(searchValue)
        )
      )
    }
  }, [options, searchValue])

  const onSelect = (currentValue: string) => {
    onChange(currentValue)
    setOpen(false)
  }

  const handleScroll = () => {
    const container = containerRef.current
    if (
      container &&
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !isLoading
    ) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }
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
              <PopoverTrigger asChild disabled={!options?.length}>
                <Input
                  name={name}
                  prefixIcon={<Search className="w-5 text-muted-foreground" />}
                  className="text-sm"
                  value={
                    value
                      ? options?.find((option) => option.name === value)?.name
                      : "Select city..."
                  }
                />
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="start">
                <Command
                  filter={(value, search) => {
                    if (value.startsWith(search)) return 1
                    return 0
                  }}
                >
                  <CommandInput
                    placeholder="Search city..."
                    className="h-9"
                    value={searchValue}
                    onValueChange={(value) => {
                      onSearch(value)
                    }}
                  />
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup
                    className="h-60 overflow-auto"
                    onScroll={handleScroll}
                    ref={containerRef}
                  >
                    {loadedOptions.map((option) => {
                      return (
                        <CommandItem
                          key={option.id}
                          value={option.name}
                          onSelect={(currentValue) => {
                            field.onBlur()
                            field.onChange(currentValue)
                            onSelect(currentValue)
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
