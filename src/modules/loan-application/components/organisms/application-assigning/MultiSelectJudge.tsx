import { CheckIcon, Search, X } from "lucide-react"
import {
  type MouseEvent,
  type KeyboardEvent,
  forwardRef,
  useEffect,
  useState
} from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { JudgeAvatar } from "@/modules/loan-application-management/components/atoms/JudgeAvatar"
import { type JudgeInfo } from "../../../../../types/application/application-assign.type"

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: JudgeInfo[]

  /** The default selected values when the component mounts. */
  defaultValue: JudgeInfo[]

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  onChangeValues: (value: JudgeInfo[]) => void

  onAddButtonTap: (value: JudgeInfo[]) => void
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      defaultValue = [],
      placeholder = "Select options",
      onChangeValues,
      onAddButtonTap,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      useState<JudgeInfo[]>(defaultValue)

    useEffect(() => {
      onChangeValues(selectedValues)
    }, [onChangeValues, selectedValues])

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues]

        newSelectedValues.pop()
        setSelectedValues(newSelectedValues)
      }
    }

    const toggleOption = (value: JudgeInfo) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]

      setSelectedValues(newSelectedValues)
    }

    const handleClickToOpen = () => {
      setIsPopoverOpen((preState) => !preState)
    }

    const handleTogglePopover = (open: boolean) => {
      setIsPopoverOpen(open)
    }

    const handleAddJudge = (e: MouseEvent<HTMLButtonElement>) => {
      onAddButtonTap(selectedValues)
      setSelectedValues([])
      e.stopPropagation()
    }

    return (
      <Popover open={isPopoverOpen} onOpenChange={handleTogglePopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            className={cn(
              "flex h-auto min-h-16 w-full justify-start rounded-lg border bg-white p-2 hover:bg-white",
              isPopoverOpen && "border-black shadow-lg"
            )}
            onClick={handleClickToOpen}
          >
            <Search className="mr-2 mt-3 size-6 cursor-pointer self-start text-zinc-600" />

            {selectedValues.length > 0 ? (
              <div className="items-top flex flex-1 justify-between ">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.id === value.id)

                    return (
                      <div
                        key={(option?.email ?? "") + (option?.name ?? "")}
                        className="flex items-center justify-center rounded-md border border-stone-300 p-1 py-0.5"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                      >
                        <JudgeAvatar
                          avatar={option?.avatar}
                          className="size-5 text-xs"
                          email={option?.name}
                          name={option?.name ?? ""}
                        />

                        <span className="ml-1 overflow-hidden text-sm font-semibold text-black">
                          {option?.name}
                        </span>

                        <X
                          className="ml-1 size-3 text-zinc-400"
                          strokeWidth={3}
                          onClick={() => {
                            toggleOption(value)
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
                {selectedValues.length > 0 && (
                  <Button type="button" onClick={handleAddJudge}>
                    Add
                  </Button>
                )}
              </div>
            ) : (
              <span className="text-sm font-normal text-gray-300">
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-96 p-0"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              {!options.length ? (
                <div className="py-6 text-center text-sm">
                  No results found.
                </div>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              <CommandGroup onWheel={(e) => e.stopPropagation()}>
                {options.map((option) => {
                  const isSelected = selectedValues
                    .map((e) => e.id)
                    .includes(option.id)
                  const value = option.email + " " + option.name

                  return (
                    <CommandItem
                      key={option.id}
                      className="cursor-pointer"
                      value={value}
                      onSelect={() => toggleOption(option)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-black",
                          isSelected
                            ? "bg-black text-white"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="size-4" strokeWidth={2} />
                      </div>

                      <JudgeAvatar
                        avatar={option?.avatar}
                        className="m-0.5 size-9"
                        email={option?.name}
                        name={option?.name ?? ""}
                      />

                      <div className="ml-2">
                        <div className="text-sm font-medium">{option.name}</div>
                        <div className="text-xs text-text-tertiary">
                          {option.email}
                        </div>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = "MultiSelect"
