// src/components/multi-select.tsx

import { CheckIcon, CircleUserRound, Search, X } from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useEffect } from "react"
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

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string

  onClose: (value: JudgeInfo[]) => void
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      defaultValue = [],
      placeholder = "Select options",
      modalPopover = false,
      onClose,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<JudgeInfo[]>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    useEffect(() => {
      setSelectedValues([])
      if (isPopoverOpen === false) {
        onClose(selectedValues)
      }
    }, [isPopoverOpen, onClose, selectedValues])

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(selectedValues)
      }
    }, [defaultValue, selectedValues])

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
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

    const handleTogglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen)
    }

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-2.5 rounded-lg border min-h-12 h-auto justify-between bg-white hover:bg-white",
              isPopoverOpen && "border-black shadow-lg"
            )}
          >
            {!!selectedValues.length && (
              <Search className="h-5 w-5 cursor-pointer text-zinc-600 mr-2 flex-shrink-0 self-start mt-0.5" />
            )}

            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.id === value.id)
                    return (
                      <div
                        className="flex rounded-md p-1 py-0.5 justify-center items-center border-stone-300 border"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                      >
                        {option?.avatar ? (
                          <Avatar
                            className={
                              "h-6 w-6 rounded-full overflow-hidden bg-slate-200 justify-center align-middle"
                            }
                          >
                            <AvatarImage
                              src={option.avatar}
                              alt={option.name}
                            />
                            <AvatarFallback className="flex align-middle items-center justify-center h-full">
                              <span className="text-black text-xs">
                                {option?.name?.slice(0, 2)}
                              </span>
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <CircleUserRound
                            className="text-black w-5 h-5"
                            strokeWidth={1}
                          />
                        )}

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
              </div>
            ) : (
              <div className="flex items-center w-full mx-auto">
                <Search className="h-5 w-5 cursor-pointer text-zinc-600 mr-2 -mt-0.5" />
                <span className="text-sm text-gray-300 font-normal">
                  {placeholder}
                </span>
              </div>
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
              <CommandEmpty>No results found.</CommandEmpty>
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

                      {option.avatar ? (
                        <Avatar
                          className={cn(
                            "h-6 w-6 rounded-full overflow-hidden bg-slate-200"
                          )}
                        >
                          <AvatarImage
                            src={option.avatar}
                            alt={option.name ?? ""}
                          />
                          <AvatarFallback className="flex flex-row align-middle items-center justify-center h-full">
                            {option.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <CircleUserRound
                          className="text-zinc-700 w-10 h-10"
                          strokeWidth={0.5}
                        />
                      )}
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
