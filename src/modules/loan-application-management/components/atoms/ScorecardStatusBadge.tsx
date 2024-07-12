import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

interface IScorecardStatusBadgeProps {
  numberOfJudge: number
  numberOfScoredJudge: number
}

export const ScorecardStatusBadge = ({
  numberOfJudge,
  numberOfScoredJudge
}: IScorecardStatusBadgeProps) => {
  const NudgeIcon = Icons.nudge
  const isDisable = numberOfScoredJudge === numberOfJudge

  return (
    <Badge
      variantColor={isDisable ? "gray" : "lightBlue"}
      className={cn(
        isDisable && "opacity-40",
        "h-7 text-black font-normal bg-opacity-100",
        "flex justify-between",
        "focus:outline-none focus:ring-0"
      )}
    >
      <NudgeIcon className="fill-black mr-2" />
      {numberOfScoredJudge} of {numberOfJudge} Scored
      <ChevronDownIcon className="ml-2 w-5 h-5" />
    </Badge>
  )
}
