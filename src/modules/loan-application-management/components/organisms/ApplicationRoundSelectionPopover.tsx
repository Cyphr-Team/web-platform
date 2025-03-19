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
import {
  capitalizeWords,
  snakeCaseToText,
  toastError,
  toastSuccess
} from "@/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { useSelectRoundLoanApplication } from "@/modules/loan-application-management/hooks/useMutation/useSelectRoundLoanApplication.ts"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import _ from "lodash"

const statuses: LoanApplicationStatus[] = [
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
  applicationId,
  roundStatus
}) => {
  const { mutate, isPending } = useSelectRoundLoanApplication()

  const onSelect = (value: LoanApplicationStatus) => {
    mutate(
      {
        applicationId: applicationId,
        status: value
      },
      {
        onSuccess: () => {
          toastSuccess({
            title: TOAST_MSG.workspaceAdmin.selectRoundSuccess.title,
            description: `Application round status has been changed to ${capitalizeWords(
              convertStatusToText(value)
            )}`
          })
          setOpen(false)
        },
        onError: (e) => {
          toastError({
            title: TOAST_MSG.workspaceAdmin.selectRoundError.title,
            description:
              e.response?.data.message ??
              "Something went wrong. Please try again."
          })
        }
      }
    )
  }

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent">
            <StatusRoundBadge round={roundStatus}>
              {capitalizeWords(convertStatusToText(roundStatus))}
            </StatusRoundBadge>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="rounded-lg p-2" side="bottom">
          <Command className="p-0">
            <div className="m-2 rounded-lg border border-gray-300">
              <CommandInput className="m-0" placeholder="Search" />
            </div>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {isPending ? (
                <Loader2
                  className={cn(
                    "absolute left-1/2 top-1/2 animate-spin text-gray-300 transition-all ease-out"
                  )}
                />
              ) : null}
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status}
                    className="flex h-10 cursor-pointer items-center gap-2"
                    disabled={isPending}
                    value={convertStatusToText(status)}
                    onSelect={(value) => {
                      // TODO: Call API to select round given applicationId, selectedStatus
                      const selectedStatus =
                        statuses.find(
                          (status) => convertStatusToText(status) === value
                        ) ?? roundStatus

                      onSelect(selectedStatus)
                    }}
                  >
                    <Checkbox
                      checked={_.eq(roundStatus?.toUpperCase(), status)}
                      className=" size-5 border-2 border-gray-300 data-[state=checked]:bg-gray-600"
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
