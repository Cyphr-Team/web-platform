import { Badge } from "@/components/ui/badge"
import { Button, ButtonLoading } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { APP_PATH } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext
} from "@/modules/loan-application/providers"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { useNavigate } from "react-router-dom"
import { CustomAlertDialog } from "./AlertDialog"
import { cn } from "@/lib/utils"
import { DiscardApplication } from "@/modules/loan-application/components/atoms/DiscardApplication"
import { Icons } from "@/components/ui/icons"
import { CuKhoaiMonButton } from "@/modules/loan-application/components/atoms/CuKhoaiMonButton.tsx"
import { isProductionEnvironment } from "@/utils/domain.utils.ts"
import { useState } from "react"

export function ApplicationDetailsHeader() {
  const { loanApplicationDetails, isFetchingDetails } =
    useBRLoanApplicationDetailsContext()
  const [counter, setCounter] = useState(1)
  const { submitLoanForm, isSubmitting } = useLoanApplicationFormContext()
  const status = loanApplicationDetails?.status ?? LoanApplicationStatus.DRAFT
  const navigate = useNavigate()

  const editableStatuses = [
    LoanApplicationStatus.DRAFT.toLowerCase(),
    LoanApplicationStatus.PENDING_SUBMISSION.toLowerCase()
  ]

  const onConfirmed = () => {
    if (editableStatuses.includes(status)) {
      // Save and close
      submitLoanForm({ isSaveDraft: true })
    } else {
      // Close
      navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
    }
  }

  const increaseCounter = () => setCounter((prevState) => prevState + 1)

  const description = `Are you sure you want to save and continue with this loan application?`

  return (
    <nav
      className={cn(
        "sticky top-0 z-20 flex w-full shrink-0 items-center justify-between gap-4 border-y bg-white p-4 pr-2",
        "md:h-20 md:border-t-0 md:p-5 md:pr-8"
      )}
    >
      <div className="flex min-w-20 items-center gap-2">
        <h4
          className={cn(
            "ml-0 min-w-20 truncate text-lg font-semibold md:ml-3",
            "md:text-2xl"
          )}
          title={loanApplicationDetails?.loanProgram?.name}
        >
          {status && editableStatuses.includes(status)
            ? loanApplicationDetails?.loanProgram?.name
            : null}

          {!isFetchingDetails &&
            !editableStatuses.includes(status) &&
            "Status:"}
        </h4>
        {isFetchingDetails ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <Badge
            isDot
            isDotBefore
            className="text-sm"
            variant="soft"
            variantColor={getBadgeVariantByStatus(status)}
            onClick={increaseCounter}
          >
            {capitalizeWords(snakeCaseToText(status))}
          </Badge>
        )}
      </div>
      {editableStatuses.includes(status) ? (
        <div className="flex gap-2">
          {!isProductionEnvironment() && counter > 10 ? (
            <CuKhoaiMonButton />
          ) : null}
          <DiscardApplication />
          <CustomAlertDialog
            cancelText="Cancel"
            confirmText="Save & Continue"
            description={<span className="break-keep">{description}</span>}
            title="Save and continue?"
            onConfirmed={onConfirmed}
          >
            <ButtonLoading isLoading={isSubmitting} variant="outline">
              <Icons.saveApplication className="mr-1" />
              Save and continue
            </ButtonLoading>
          </CustomAlertDialog>
        </div>
      ) : (
        <Button variant="outline" onClick={onConfirmed}>
          Close
        </Button>
      )}
    </nav>
  )
}
