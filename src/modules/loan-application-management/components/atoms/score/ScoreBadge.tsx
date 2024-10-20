import { Badge } from "@/components/ui/badge"

interface IScoreBadgeProps {
  score: number | null
  totalScore?: number
  isFinished: boolean
}

export function ScoreBadge({
  score,
  totalScore = 5,
  isFinished
}: IScoreBadgeProps) {
  return (
    <Badge
      className="h-7 text-xs px-3 font-normal"
      variant="outline"
      variantColor={isFinished ? "white" : "orange"}
    >
      {`${score}/${totalScore}`}
    </Badge>
  )
}
