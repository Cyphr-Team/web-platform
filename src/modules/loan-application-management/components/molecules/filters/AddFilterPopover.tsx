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
import { Option } from "@/types/common.type"
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
      console.error("Something went wrong.", e)
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
            <div className="pb-2 flex flex-col h-auto max-h-96 overflow-hidden">
              <div className="m-4 mb-0 border-primary border focus-within:shadow-lg rounded-lg overflow-hidden">
                <div
                  className={cn(
                    "w-full gap-2 py-2.5",
                    "flex flex-wrap max-h-24 overflow-auto overscroll-contain"
                  )}
                >
                  <CommandPrimitive.Input
                    ref={searchRef}
                    value={search}
                    onValueChange={setSearch}
                    autoFocus
                    placeholder="Search"
                    className={cn(
                      "bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                      "flex h-6 px-3 w-full text-sm placeholder:text-muted-foreground"
                    )}
                  />
                </div>
              </div>
              <div className="px-4 font-semibold text-xs py-2 pb-1">
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
                        className="px-4 flex mt-1 items-center justify-between gap-2 h-10 cursor-pointer text-slate-950 rounded-none"
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
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
