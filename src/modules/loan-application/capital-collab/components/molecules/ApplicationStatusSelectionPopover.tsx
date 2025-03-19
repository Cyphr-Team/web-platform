import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { type LoanApplicationStatus } from "@/types/loan-application.type"
import {
  changeableStatuses,
  getBadgeVariantByStatus,
  getStatusDisplayName,
  isAbleToChangeStatus
} from "@/modules/loan-application/capital-collab/services"
import { Badge } from "@/components/ui/badge.tsx"
import { ChevronDownIcon } from "lucide-react"
import { useChangeApplicationStatus } from "@/modules/loan-application-management/hooks/useMutation/useChangeApplicationStatus.ts"
import { useBoolean } from "@/hooks"

interface Props {
  applicationId: string
  status: LoanApplicationStatus
}

export const ApplicationStatusSelectionPopover: React.FC<Props> = ({
  applicationId,
  status
}) => {
  const { mutate, isPending } = useChangeApplicationStatus()

  const onSelect = (value: LoanApplicationStatus) => {
    mutate(
      {
        applicationId: applicationId,
        status: value
      },
      {
        onSuccess: () => {
          open.onFalse()
        }
      }
    )
  }

  const open = useBoolean(false)

  const handleSelectStatus = (value: string) => {
    const selectedStatus =
      changeableStatuses.find(
        (status) => getStatusDisplayName(status).toLowerCase() == value
      ) ?? status

    onSelect(selectedStatus)
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open.value} onOpenChange={open.setValue}>
        <PopoverTrigger asChild>
          {isAbleToChangeStatus(
            status.toUpperCase() as LoanApplicationStatus
          ) ? (
            <Button className="bg-transparent hover:bg-transparent p-0">
              <Badge
                className="truncate"
                variant="soft"
                variantColor={getBadgeVariantByStatus(status)}
              >
                {getStatusDisplayName(status)}
                <ChevronDownIcon className="size-4 ml-1" />
              </Badge>
            </Button>
          ) : (
            <Badge
              className="truncate"
              variant="soft"
              variantColor={getBadgeVariantByStatus(status)}
            >
              {getStatusDisplayName(status)}
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="rounded-lg p-0 w-[200px]"
          side="bottom"
        >
          <div className="text-xs font-semibold p-1 mx-2 mt-1">
            Select status
          </div>
          <Command className="p-0">
            <CommandList>
              <CommandGroup>
                {changeableStatuses.map((status) => (
                  <CommandItem
                    key={status}
                    className="flex h-10 cursor-pointer items-center gap-2"
                    disabled={isPending}
                    value={getStatusDisplayName(status)}
                    onSelect={handleSelectStatus}
                  >
                    <Badge
                      className="truncate"
                      variant="soft"
                      variantColor={getBadgeVariantByStatus(status)}
                    >
                      {getStatusDisplayName(status)}
                    </Badge>
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
