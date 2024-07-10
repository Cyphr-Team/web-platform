import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { useNavigate } from "react-router-dom"
import { getScoredTooltipContent } from "../../services"
import { ScoredTooltip } from "./ScoredTooltip"

interface IScoredBadgeStatusProps {
  loanApplicationId: string
  loanProgramType: string
  scoredAt?: string | null
}

export const ScoredBadgeStatus = ({
  loanApplicationId,
  scoredAt,
  loanProgramType
}: IScoredBadgeStatusProps) => {
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
      onClick={handleClickDetail}
      type="button"
      className="p-0 h-auto cursor-pointer"
      variant="ghost"
      asChild
    >
      {scoredAt ? (
        <ScoredTooltip tooltipContent={getScoredTooltipContent(scoredAt)}>
          <Badge
            variantColor="lightBlue"
            className="h-7 text-black font-normal bg-opacity-100"
          >
            Scorecard Submitted
          </Badge>
        </ScoredTooltip>
      ) : (
        <span>
          <Badge
            variantColor="orange"
            className="h-7 text-black font-normal bg-opacity-20"
          >
            Incomplete scorecard
          </Badge>
        </span>
      )}
    </Button>
  )
}
