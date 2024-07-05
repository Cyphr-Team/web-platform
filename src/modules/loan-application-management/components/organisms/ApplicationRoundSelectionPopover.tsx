import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { Checkbox } from "@/components/ui/checkbox"

const statuses: LoanApplicationStatus[] = [
  LoanApplicationStatus.PENDING_SUBMISSION,
  LoanApplicationStatus.READY_FOR_REVIEW,
  LoanApplicationStatus.ROUND_1,
  LoanApplicationStatus.ROUND_2,
  LoanApplicationStatus.ROUND_3,
  LoanApplicationStatus.ELIMINATED_AFTER_INITIAL_REVIEW,
  LoanApplicationStatus.ELIMINATED_AFTER_ROUND_1,
  LoanApplicationStatus.ELIMINATED_AFTER_ROUND_2,
  LoanApplicationStatus.ELIMINATED_AFTER_ROUND_3
]

interface Props {
  applicationId: string
  roundStatus: LoanApplicationStatus
}

const convertStatusToText = (status: LoanApplicationStatus) => {
  return snakeCaseToText(status.toString()).toLowerCase()
}

export const ApplicationRoundSelectionPopover: React.FC<Props> = ({
  roundStatus
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState(roundStatus)
  return (
    <div className="flex items-center justify-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent">
            <StatusRoundBadge round={selectedStatus}>
              {capitalizeWords(convertStatusToText(selectedStatus))}
            </StatusRoundBadge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 rounded-lg" side="bottom" align="start">
          <Command className="p-0">
            <div className="m-2 border rounded-lg border-gray-300">
              <CommandInput placeholder="Search" className="m-0" />
            </div>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    className="flex items-center gap-2 h-10 cursor-pointer"
                    key={status}
                    value={convertStatusToText(status)}
                    onSelect={(value) => {
                      // TODO: Call API to select round given applicationId, selectedStatus

                      setSelectedStatus(
                        statuses.find(
                          (status) => convertStatusToText(status) === value
                        ) ?? roundStatus
                      )
                      setOpen(false)
                    }}
                  >
                    <Checkbox
                      checked={selectedStatus === status}
                      className=" h-5 w-5 data-[state=checked]:bg-gray-600 border-gray-300 border-2"
                    />
                    <StatusRoundBadge round={status}>
                      {capitalizeWords(convertStatusToText(status))}
                    </StatusRoundBadge>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
