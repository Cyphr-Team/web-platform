import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Option } from "@/types/common.type"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBoolean } from "@/hooks"

interface AddFilterProps {
  options: Option[]
  setSelectedFilterOptions: React.Dispatch<React.SetStateAction<Option[]>>
  className?: string
}

export const AddFilterPopover: React.FC<AddFilterProps> = ({
  options,
  setSelectedFilterOptions,
  className
}) => {
  const { value, setValue } = useBoolean(false)

  const onSelect = (option: Option) =>
    setSelectedFilterOptions((prev) => [...prev, option])

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Popover open={value} onOpenChange={setValue}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="text-sm font-semibold border border-input h-10 px-4 py-2 rounded-full text-slate-700"
          >
            <Plus size="16" className="mr-1.5" />
            Add Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="rounded-lg p-0 m-0 w-full"
          side="bottom"
          align="center"
        >
          <Command>
            <div className="m-4 mb-0 pb-2 flex flex-col h-auto max-h-96 overflow-hidden">
              <div className="border-primary border focus-within:shadow-lg rounded-lg overflow-hidden">
                <div
                  className={cn(
                    "w-full gap-2 py-2.5",
                    "flex flex-wrap max-h-24 overflow-auto overscroll-contain"
                  )}
                >
                  <CommandPrimitive.Input
                    placeholder="Search"
                    className={cn(
                      "bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                      "flex h-6 px-3 w-full text-sm placeholder:text-muted-foreground"
                    )}
                  />
                </div>
              </div>

              <CommandList>
                <CommandGroup className="p-0 mt-1">
                  {options.map((opt) => {
                    const Icon = opt.icon
                    return (
                      <CommandItem
                        className="flex mt-1 items-center justify-between gap-2 h-10 cursor-pointer text-slate-950"
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => onSelect(opt)}
                      >
                        {opt.label}
                        {Icon && <Icon className="w-4 h-4" />}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </div>
            {!options.length ? (
              <div className="py-3 text-center text-sm">No results found.</div>
            ) : (
              <CommandEmpty className="m-0">No results found.</CommandEmpty>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
