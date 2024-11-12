import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ButtonViewDetailLoanApplication({
  loanApplicationId,
  loanProgramType
}: {
  loanApplicationId: string
  loanProgramType: string
}) {
  const navigate = useNavigate()

  const handleClickDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
        loanApplicationId
      ),
      { state: { applicationDetail: { type: loanProgramType } } }
    )
  }

  return (
    <Button
      className="flex h-8 items-center gap-0.5 px-2 pr-1"
      variant="ghost"
      onClick={handleClickDetail}
    >
      Review
      <ChevronRight className="w-4" />
    </Button>
  )
}
