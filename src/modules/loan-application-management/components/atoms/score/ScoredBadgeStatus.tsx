import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { useNavigate } from "react-router-dom"
import { getScoredTooltipContent } from "../../../services"
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

export function ScoredBadgeStatus({
  scoredAt,
  children
}: React.PropsWithChildren<IScoredBadgeStatusProps>) {
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
      className={cn(
        "h-7 whitespace-nowrap bg-opacity-100 font-normal text-black",
        variant.className
      )}
      variantColor={variant.variantColor}
    >
      {children || variant.text}
    </Badge>
  )
}

export function ScoredBadgeStatusWithTooltip({
  loanApplicationId,
  scoredAt,
  loanProgramType
}: IScoredBadgeStatusWithToolTipProps) {
  const navigate = useNavigate()

  const handleClickDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY.replace(
        ":id",
        loanApplicationId
      ),
      { state: { applicationDetail: { type: loanProgramType } } }
    )
  }

  const scoredBadgeStatus = <ScoredBadgeStatus scoredAt={scoredAt} />

  return (
    <Button
      asChild
      className="h-auto cursor-pointer p-0"
      type="button"
      variant="ghost"
      onClick={handleClickDetail}
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
