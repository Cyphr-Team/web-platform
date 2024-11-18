import * as React from "react"
import { Input, type InputProps } from "@/components/ui/input"
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CheckIcon, ChevronDown } from "lucide-react"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import en from "react-phone-number-input/locale/en"

interface CountrySelectProps {
  value: string
  onChange: (country: string) => void
  labels: en
  iconComponent: unknown
}

function CountrySelect({ value, onChange, labels = en }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="justify-between rounded-r-none border-r-0 px-2 text-sm font-normal"
          variant="outline"
        >
          {value}
          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0" side="bottom">
        <Command>
          <CommandInput className="h-9" placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="h-60 overflow-auto">
            {getCountries().map((country) => (
              <CommandItem
                key={country}
                value={`${country}, ${labels[country]}`}
                onSelect={() => {
                  onChange(country)
                  setOpen(false)
                }}
              >
                {country}, {labels[country]} +{getCountryCallingCode(country)}
                <CheckIcon
                  className={cn(
                    "ml-auto size-4",
                    value === country ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const CustomPhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <Input
        ref={ref}
        {...props}
        className="rounded-lg rounded-l-none border-l-0 pl-1 text-sm"
        maxLength={15}
        wrapperClassName="w-full"
      />
    )
  }
)

export { CountrySelect, CustomPhoneInput }
