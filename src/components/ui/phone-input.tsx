import * as React from "react"
import { Input, InputProps } from "@/components/ui/input"
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
          variant="outline"
          aria-expanded={open}
          className="justify-between border-r-0 rounded-r-none px-2 font-normal"
        >
          {value}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
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
                    "ml-auto h-4 w-4",
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
        className="border-l-0 rounded-l-none pl-1"
        wrapperClassName="w-full"
      />
    )
  }
)

export { CountrySelect, CustomPhoneInput }
