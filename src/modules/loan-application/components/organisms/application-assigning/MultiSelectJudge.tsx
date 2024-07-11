// src/components/multi-select.tsx

import * as React from "react"
import { CheckIcon, XCircle, XIcon, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
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
      maxCount = 3,
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

    const handleClear = () => {
      setSelectedValues([])
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen)
    }

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount)
      setSelectedValues(newSelectedValues)
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
              "flex w-full p-1 rounded-lg border min-h-10 h-auto justify-between bg-white hover:bg-white"
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center p-2">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.id === value.id)
                    return (
                      <div className="flex flex-row rounded-md m-1 p-1 justify-center align-middle items-center outline-gray-200 outline">
                        <Avatar
                          className={
                            "h-6 w-6 rounded-full overflow-hidden bg-slate-200 justify-center align-middle"
                          }
                        >
                          <AvatarImage
                            src={option?.avatar}
                            alt={option?.name ?? ""}
                          />
                          <AvatarFallback className="flex flex-row align-middle items-center justify-center h-full">
                            <span className="text-black text-xs">
                              {option?.name?.slice(0, 2)}
                            </span>
                          </AvatarFallback>
                        </Avatar>
                        <span className="ml-2 text-black w-20 overflow-hidden">
                          {option?.name}
                        </span>
                        <X
                          className="w-4 h-4 ml-2"
                          color="#CCCCCC"
                          strokeWidth={3}
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleOption(value)
                          }}
                        />
                      </div>
                    )
                  })}
                  {selectedValues.length > maxCount && (
                    <div className="text-gray-200">
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation()
                          clearExtraOptions()
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClear()
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center w-full mx-auto">
                <Search className="h-4 cursor-pointer text-muted-foreground mx-2" />
                <span className="text-sm text-gray-400 font-normal">
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
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
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
                      <span className="ml-2">{option.name}</span>
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
