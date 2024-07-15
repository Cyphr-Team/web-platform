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
import { isLoanReady } from "@/utils/domain.utils"
import { checkIsJudge } from "@/utils/check-roles"
import { statusesAbleToMakeDecision } from "@/utils/loan-application-status.utils"

const ApplicationStatusDropDown = ({
  currentDecision,
  setIsSuccess
}: {
  currentDecision?: LoanApplicationStatus
  setIsSuccess?: (value?: boolean) => void
}) => {
  const [selectedDecision, setSelectedDecision] =
    useState<LoanApplicationStatus>()

  const currentDecisionInfo = getSelectInfoByDecision(currentDecision)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-10">
            <Dot variantColor={currentDecisionInfo.variantColor} />
            {currentDecisionInfo.label} <ChevronDown className="ml-1 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 m-0">
          {Object.keys(LoanDecisionEnum).map((decision) => {
            const info = getSelectInfoByDecision(
              LoanApplicationStatus[
                decision as keyof typeof LoanApplicationStatus
              ]
            )
            return (
              <DropdownMenuItem
                className="cursor-pointer py-2 font-medium"
                key={decision}
                onClick={() => info.value && setSelectedDecision(info.value)}
              >
                <Dot variantColor={info.variantColor} />
                {info.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedDecision && (
        <ChangeApplicationStatusDialog
          fromDecision={currentDecisionInfo.value}
          toDecision={selectedDecision}
          onCancel={() => setSelectedDecision(undefined)}
          setSuccess={setIsSuccess}
        />
      )}
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

export const ChangeApplicationStatusButton = () => {
  const { id } = useParams()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const { loanApplicationDetails } = useLoanApplicationDetailContext()
  const { data, isLoading } = useQueryGetLoanApplicationDetailStatus({
    applicationId: id
  })

  const currentStatus = data?.toUpperCase()
  const isAbleToUpdateDecision =
    !checkIsJudge() &&
    statusesAbleToMakeDecision.some((status) => status === currentStatus) &&
    !loanApplicationDetails?.loanProgram?.deletedAt

  if (isLoading)
    return <Skeleton className="w-40 h-8 self-start md:self-center" />

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
            <TooltipTrigger color={getBadgeVariantByStatus(data)}>
              <Button
                variant="outline"
                className="capitalize h-10 w-48 rounded-full relative justify-center text-sm"
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
