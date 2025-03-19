import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Dot } from "@/components/ui/dot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { type LoanApplicationStatus } from "@/types/loan-application.type"
import { BadgeInfo, ChevronDown } from "lucide-react"
import { useParams } from "react-router-dom"
import {
  changeableStatuses,
  getBadgeVariantByStatus,
  getStatusDisplayName,
  isAbleToChangeStatus
} from "../../services"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider.tsx"
import { useQueryGetLoanApplicationDetailStatus } from "@/modules/loan-application-management/hooks/useQuery/useQueryGetLoanApplicationDetailStatus.ts"
import { getApplicationTipByStatus } from "@/modules/loan-application-management/services"
import { LoanDecisionSubmitted } from "@/modules/loan-application-management/components/organisms/LoanDecisionSubmited.tsx"
import { useChangeApplicationStatus } from "@/modules/loan-application-management/hooks/useMutation/useChangeApplicationStatus.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { useBoolean } from "@/hooks"

function ApplicationStatusDropDown({
  applicationId,
  currentDecision
}: {
  currentDecision?: LoanApplicationStatus
  applicationId?: string
}) {
  const { mutate } = useChangeApplicationStatus()

  const onSelect = (value: LoanApplicationStatus) => {
    if (applicationId && currentDecision) {
      mutate({
        applicationId: applicationId,
        status: value
      })
    } else {
      toastError({
        title: TOAST_MSG.workspaceAdmin.changeStatusError.title,
        description: "Something went wrong. Please try again."
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full w-[240px]" variant="outline">
          <Dot variantColor={getBadgeVariantByStatus(currentDecision)} />
          {getStatusDisplayName(currentDecision)}
          <ChevronDown className="ml-1 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="m-0 w-[220px]">
        {changeableStatuses.map((decision) => {
          return (
            <DropdownMenuItem
              key={decision}
              className="cursor-pointer py-2 font-medium"
              onClick={() => onSelect(decision as LoanApplicationStatus)}
            >
              <Dot variantColor={getBadgeVariantByStatus(decision)} />
              {getStatusDisplayName(decision)}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CCChangeApplicationStatusButton() {
  const { id } = useParams()
  const isSuccess = useBoolean()
  const { loanApplicationDetails } = useLoanApplicationDetailContext()
  const { data, isLoading } = useQueryGetLoanApplicationDetailStatus({
    applicationId: id
  })

  if (isLoading)
    return <Skeleton className="h-8 w-40 self-start md:self-center" />

  return (
    <div className="flex items-center gap-2 self-start md:self-center">
      <div className="flex items-center text-sm font-medium">Status:</div>

      {isAbleToChangeStatus(data?.toUpperCase() as LoanApplicationStatus) ? (
        <ApplicationStatusDropDown applicationId={id} currentDecision={data} />
      ) : (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild color={getBadgeVariantByStatus(data)}>
              <Button
                className="relative h-10 min-w-48 justify-center rounded-full text-sm capitalize"
                variant="outline"
              >
                <Dot variantColor={getBadgeVariantByStatus(data)} />
                {getStatusDisplayName(data)}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-1">
              <BadgeInfo className="w-5 text-blue-500" />
              {getApplicationTipByStatus(
                data,
                !!loanApplicationDetails?.loanProgram?.deletedAt
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Dialog open={isSuccess.value} onOpenChange={isSuccess.setValue}>
        <DialogContent>
          <LoanDecisionSubmitted />
        </DialogContent>
      </Dialog>
    </div>
  )
}
