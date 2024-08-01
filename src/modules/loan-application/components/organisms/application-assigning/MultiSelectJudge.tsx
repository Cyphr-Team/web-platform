import { CheckIcon, Search, X } from "lucide-react"
import {
  MouseEvent,
  KeyboardEvent,
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
import { JudgeInfo } from "../../../../../types/application/application-assign.type"

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
            onClick={handleClickToOpen}
            className={cn(
              "flex w-full p-2 rounded-lg border min-h-16 h-auto justify-start bg-white hover:bg-white",
              isPopoverOpen && "border-black shadow-lg"
            )}
          >
            <Search className="h-6 w-6 cursor-pointer text-zinc-600 mr-2 self-start mt-3" />

            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-top flex-1 ">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.id === value.id)
                    return (
                      <div
                        key={(option?.email ?? "") + (option?.name ?? "")}
                        className="flex rounded-md p-1 py-0.5 justify-center items-center border-stone-300 border"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                      >
                        <JudgeAvatar
                          avatar={option?.avatar}
                          name={option?.name ?? ""}
                          email={option?.name}
                          className="h-5 w-5 text-xs"
                        />

                        <span className="ml-1 font-semibold text-black overflow-hidden text-sm">
                          {option?.name}
                        </span>

                        <X
                          className="w-3 h-3 ml-1 text-zinc-400"
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
              <span className="text-sm text-gray-300 font-normal">
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-96 p-0"
          align="start"
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

                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => toggleOption(option)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black",
                          isSelected
                            ? "bg-black text-white"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" strokeWidth={2} />
                      </div>

                      <JudgeAvatar
                        avatar={option?.avatar}
                        name={option?.name ?? ""}
                        email={option?.name}
                        className="h-9 w-9 m-0.5"
                      />

                      <div className="ml-2">
                        <div className="text-sm font-medium">{option.name}</div>
                        <div className="text-text-tertiary text-xs">
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
