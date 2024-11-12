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
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { snakeCaseToText } from "@/utils"
import { isLaunchKC, isLoanReady } from "@/utils/domain.utils"
import { statusesAbleToMakeDecision } from "@/utils/loan-application-status.utils"
import { BadgeInfo, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { LoanDecisionEnum } from "../../constants/types/application"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getApplicationTipByStatus,
  getBadgeVariantByStatus,
  getSelectInfoByDecision
} from "../../services"
import { LoanDecisionSubmitted } from "../organisms/LoanDecisionSubmited"
import { ChangeApplicationStatusDialog } from "./ChangeApplicationStatusDialog"

function ApplicationStatusDropDown({
  currentDecision,
  setIsSuccess
}: {
  currentDecision?: LoanApplicationStatus
  setIsSuccess?: (value?: boolean) => void
}) {
  const [selectedDecision, setSelectedDecision] =
    useState<LoanApplicationStatus>()

  const currentDecisionInfo = getSelectInfoByDecision(currentDecision)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full px-10" variant="outline">
            <Dot variantColor={currentDecisionInfo.variantColor} />
            {currentDecisionInfo.label} <ChevronDown className="ml-1 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="m-0 w-48">
          {Object.keys(LoanDecisionEnum).map((decision) => {
            const info = getSelectInfoByDecision(
              LoanApplicationStatus[
                decision as keyof typeof LoanApplicationStatus
              ]
            )

            return (
              <DropdownMenuItem
                key={decision}
                className="cursor-pointer py-2 font-medium"
                onClick={() => info.value && setSelectedDecision(info.value)}
              >
                <Dot variantColor={info.variantColor} />
                {info.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedDecision ? (
        <ChangeApplicationStatusDialog
          fromDecision={currentDecisionInfo.value}
          setSuccess={setIsSuccess}
          toDecision={selectedDecision}
          onCancel={() => setSelectedDecision(undefined)}
        />
      ) : null}
    </>
  )
}

const getApplicationStatusTextButton = (status?: LoanApplicationStatus) => {
  switch (status) {
    case LoanApplicationStatus.APPROVED:
      return isLoanReady() ? "Ideal Applicant" : "Approved"
    case LoanApplicationStatus.DENIED:
      return isLoanReady() ? "Not Ideal Time to Apply" : "Denied"
    default:
      return snakeCaseToText(status ?? "")
  }
}

export function ChangeApplicationStatusButton() {
  const { id } = useParams()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const { loanApplicationDetails } = useLoanApplicationDetailContext()
  const { data, isLoading } = useQueryGetLoanApplicationDetailStatus({
    applicationId: id
  })

  const currentStatus = data?.toUpperCase()
  const isAbleToUpdateDecision =
    !isLaunchKC() &&
    statusesAbleToMakeDecision.some((status) => status === currentStatus) &&
    !loanApplicationDetails?.loanProgram?.deletedAt

  if (isLoading)
    return <Skeleton className="h-8 w-40 self-start md:self-center" />

  const textButton = getApplicationStatusTextButton(data)

  return (
    <div className="flex items-center gap-2 self-start md:self-center">
      <div className="flex items-center text-sm font-medium">Status:</div>

      {isAbleToUpdateDecision ? (
        <ApplicationStatusDropDown
          currentDecision={data}
          setIsSuccess={setIsSuccess}
        />
      ) : (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild color={getBadgeVariantByStatus(data)}>
              <Button
                className="relative h-10 min-w-48 justify-center rounded-full text-sm capitalize"
                variant="outline"
              >
                <Dot variantColor={getBadgeVariantByStatus(data)} />
                {textButton}
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

      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent>
          <LoanDecisionSubmitted />
        </DialogContent>
      </Dialog>
    </div>
  )
}
