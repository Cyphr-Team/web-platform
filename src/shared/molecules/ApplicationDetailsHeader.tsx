import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { APP_PATH } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { useLoanApplicationContext } from "@/modules/loan-application/providers"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { useNavigate } from "react-router-dom"

export const ApplicationDetailsHeader = () => {
  const { loanApplicationDetails, isFetchingDetails } =
    useBRLoanApplicationDetailsContext()
  const { saveForm } = useLoanApplicationContext()
  const status = loanApplicationDetails?.status ?? LoanApplicationStatus.DRAFT
  const navigate = useNavigate()

  const handleCloseApplication = () => {
    if (status === LoanApplicationStatus.DRAFT.toLowerCase()) {
      // Save and close
      saveForm()
    } else {
      // Close
      navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
    }
  }

  return (
    <nav className="w-full p-2xl md:h-20 shrink-0 flex justify-end md:justify-between items-center pr-2 md:pr-8 sticky top-0 bg-white border-b border-t md:border-t-0 z-20">
      <div className="flex items-center gap-2">
        <h4 className="text-2xl font-semibold">Status:</h4>
        {isFetchingDetails ? (
          <Skeleton className="w-20 h-8" />
        ) : (
          <Badge
            isDot
            className="text-sm"
            isDotBefore
            variant="soft"
            variantColor={getBadgeVariantByStatus(status)}
          >
            {capitalizeWords(snakeCaseToText(status))}
          </Badge>
        )}
      </div>
      <Button variant="outline" onClick={handleCloseApplication}>
        {status === LoanApplicationStatus.DRAFT.toLowerCase()
          ? "Save & Close"
          : "Close"}
      </Button>
    </nav>
  )
}
