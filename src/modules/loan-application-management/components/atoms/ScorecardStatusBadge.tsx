import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface IScorecardStatusBadgeProps {
  numberOfJudge: number
  numberOfScoredJudge: number
}

export const ScorecardStatusBadge = ({
  numberOfJudge,
  numberOfScoredJudge
}: IScorecardStatusBadgeProps) => {
  const isDisable = numberOfScoredJudge === numberOfJudge

  return (
    <Badge
      variantColor={isDisable ? "gray" : "lightBlue"}
      className={cn(
        isDisable && "opacity-40",
        "h-7 text-black font-normal bg-opacity-100"
      )}
    >
      {numberOfScoredJudge} of {numberOfJudge} Scored
    </Badge>
  )
}
