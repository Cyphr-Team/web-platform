import { ButtonLoading } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useReviewLoanApplication } from "../../hooks/useMutation/useReviewLoanApplication"
import { useChangeApplicationStatus } from "../../hooks/useMutation/useChangeApplicationStatus" // Import hook mới
import { type LoanType } from "@/types/loan-program.type"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"
import { isCapitalCollab, isLoanReady } from "@/utils/domain.utils"

export function ButtonReviewLoanApplication({
  loanApplicationStatus,
  loanApplicationId,
  loanProgramType
}: {
  loanApplicationStatus: LoanApplicationStatus
  loanApplicationId: string
  loanProgramType: LoanType
}) {
  const navigate = useNavigate()
  const {
    mutateAsync: reviewLoanApplication,
    isPending: isReviewingLoanApplication
  } = useReviewLoanApplication(loanApplicationId)

  const { mutate: changeApplicationStatus, isPending: isChangingStatus } =
    useChangeApplicationStatus()

  const handleClickDetail = async () => {
    if (
      isCapitalCollab() &&
      loanApplicationStatus.toUpperCase() ===
        LoanApplicationStatus.READY_FOR_REVIEW
    ) {
      changeApplicationStatus({
        applicationId: loanApplicationId,
        status: LoanApplicationStatus.IN_REVIEW
      })
    }

    if (
      loanApplicationStatus ===
      LoanApplicationStatus.READY_FOR_REVIEW.toLowerCase()
    ) {
      await reviewLoanApplication()
    }

    const path =
      (isLoanReady() && isEnableLoanReadyV2()) || isCapitalCollab()
        ? APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY.replace(
            ":id",
            loanApplicationId
          )
        : APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
            loanApplicationId
          )

    navigate(path, {
      state: {
        applicationDetail: {
          type: loanProgramType
        }
      }
    })
  }

  return (
    <ButtonLoading
      className="flex h-8 items-center gap-0.5 px-2 pr-1"
      isLoading={isReviewingLoanApplication || isChangingStatus}
      variant="ghost"
      onClick={handleClickDetail}
    >
      Review
      <ChevronRight className="w-4" />
    </ButtonLoading>
  )
}
