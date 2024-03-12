import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ButtonReviewLoanApplication = ({
  loanApplicationId
}: {
  loanApplicationId: string
}) => {
  const navigate = useNavigate()
  const handleClickDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
        loanApplicationId
      )
    )
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-0.5 px-2 pr-1 h-8"
      onClick={handleClickDetail}
    >
      Review
      <ChevronRight className="w-4" />
    </Button>
  )
}
