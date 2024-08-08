import { Badge } from "@/components/ui/badge"

interface IScoreBadgeProps {
  score: number | null
  totalScore?: number
  isFinished: boolean
}

export const ScoreBadge = ({
  score,
  totalScore = 5,
  isFinished
}: IScoreBadgeProps) => {
  return (
    <Badge
      variant="outline"
      variantColor={isFinished ? "white" : "orange"}
      className="h-7 text-xs px-3 font-normal"
    >
      {`${score}/${totalScore}`}
    </Badge>
  )
}
