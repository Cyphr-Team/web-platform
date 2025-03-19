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
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils"
import { type Option } from "@/types/common.type"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

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
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [search, setSearch] = useState("")
  const { value, setValue } = useBoolean(false)

  const clearSearch = () => {
    try {
      if (searchRef.current) {
        setSearch("")
        searchRef.current.focus()
      }
    } catch (e) {
      // console.error("Something went wrong.", e)
    }
  }

  const onSelect = (option: Option) => {
    setSelectedFilterOptions((prev) => [...prev, option])
    clearSearch()
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Popover open={value} onOpenChange={setValue}>
        <PopoverTrigger asChild>
          <Button
            className="h-10 rounded-full border border-input bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            variant="ghost"
          >
            <Plus className="mr-1.5" size="16" />
            Add Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="m-0 w-full rounded-lg p-0"
          side="bottom"
        >
          <Command>
            <div className="flex h-auto max-h-96 flex-col overflow-hidden pb-2">
              <div className="m-4 mb-0 overflow-hidden rounded-lg border border-primary focus-within:shadow-lg">
                <div
                  className={cn(
                    "w-full gap-2 py-2.5",
                    "flex max-h-24 flex-wrap overflow-auto overscroll-contain"
                  )}
                >
                  <CommandPrimitive.Input
                    ref={searchRef}
                    className={cn(
                      "bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                      "flex h-6 w-full px-3"
                    )}
                    placeholder="Search"
                    value={search}
                    onValueChange={setSearch}
                  />
                </div>
              </div>
              <div className="px-4 py-2 pb-1 text-xs font-semibold">
                Select filter
              </div>

              <CommandList>
                {!options.length ? (
                  <div className="py-3 text-center text-sm">
                    No results found.
                  </div>
                ) : (
                  <CommandEmpty className="py-3 text-center text-sm">
                    No results found.
                  </CommandEmpty>
                )}

                <CommandGroup className="p-0">
                  {options.map((opt) => {
                    const Icon = opt.icon

                    return (
                      <CommandItem
                        key={opt.value}
                        className="mt-1 flex h-10 cursor-pointer items-center justify-between gap-2 rounded-none px-4 text-slate-950"
                        value={opt.label}
                        onSelect={() => onSelect(opt)}
                      >
                        {opt.label}
                        {Icon ? <Icon className="size-4" /> : null}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
