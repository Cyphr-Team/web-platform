import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

interface IScorecardStatusBadgeProps {
  numberOfJudge: number
  numberOfScoredJudge: number
}

export function ScorecardStatusBadge({
  numberOfJudge,
  numberOfScoredJudge
}: IScorecardStatusBadgeProps) {
  const NudgeIcon = Icons.nudge
  const isDisable = numberOfScoredJudge === numberOfJudge

  return (
    <Badge
      className={cn(
        isDisable && "opacity-40",
        "h-7 text-black font-normal bg-opacity-100",
        "flex justify-between",
        "focus:outline-none focus:ring-0"
      )}
      variantColor={isDisable ? "gray" : "lightBlue"}
    >
      <NudgeIcon className="mr-2 fill-black" />
      {numberOfScoredJudge} of {numberOfJudge} Scored
      <ChevronDownIcon className="ml-2 size-5" />
    </Badge>
  )
}
