import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { useNavigate } from "react-router-dom"
import { getScoredTooltipContent } from "../../services"
import { ScoredTooltip } from "./ScoredTooltip"
import { cn } from "@/lib/utils"

interface IScoredBadgeStatusWithToolTipProps {
  loanApplicationId: string
  loanProgramType: string
  scoredAt?: string
}

interface IScoredBadgeStatusProps {
  scoredAt?: string | boolean
}

export const ScoredBadgeStatus = ({
  scoredAt,
  children
}: React.PropsWithChildren<IScoredBadgeStatusProps>) => {
  const variant: {
    variantColor: BadgeProps["variantColor"]
    text: string
    className: string
  } = scoredAt
    ? {
        variantColor: "lightBlue",
        text: "Scorecard Submitted",
        className: "bg-opacity-100"
      }
    : {
        variantColor: "orange",
        text: "Incomplete scorecard",
        className: "bg-opacity-20"
      }

  return (
    <Badge
      variantColor={variant.variantColor}
      className={cn(
        "h-7 text-black font-normal bg-opacity-100 whitespace-nowrap",
        variant.className
      )}
    >
      {children || variant.text}
    </Badge>
  )
}

export const ScoredBadgeStatusWithTooltip = ({
  loanApplicationId,
  scoredAt,
  loanProgramType
}: IScoredBadgeStatusWithToolTipProps) => {
  const navigate = useNavigate()

  const handleClickDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
        loanApplicationId
      ),
      { state: { applicationDetail: { type: loanProgramType } } }
    )
  }

  const scoredBadgeStatus = <ScoredBadgeStatus scoredAt={scoredAt} />

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
          {scoredBadgeStatus}
        </ScoredTooltip>
      ) : (
        <span>{scoredBadgeStatus}</span>
      )}
    </Button>
  )
}
