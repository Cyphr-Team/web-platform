import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import { sanitizeNumber } from "@/utils"
import { translateToLaunchKCScoreItems } from "@/utils/score.utils"

interface IScoreItem {
  name: string
  score: number
}

const Scores = ({ score }: IScoreItem) => {
  return (
    <div className="flex flex-row-reverse">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Button
            type="button"
            // Show only - no need to reverse order
            data-scored={score >= 5 - index}
            key={5 - index}
            variant="ghost"
            className={cn(
              // If the scored true, fill the color
              "[&>.score-rocket-icon>path]:data-[scored=true]:fill-inherit",
              // Init state
              "[&>.score-rocket-icon>path]:fill-transparent",
              "h-auto p-0.5 mx-0.5"
            )}
          >
            <Icons.rocket className="score-rocket-icon" />
          </Button>
        ))}
    </div>
  )
}

// Generics Props: We can use this to pass any type of score data
// Example: ILaunchKCApplicationScore, IAnotherBankApplicationScore, etc.
interface IScoreCardDetailProps<T = ILaunchKCApplicationAssignScore> {
  scoreData?: T
}

export const ScoreCardDetail = ({ scoreData }: IScoreCardDetailProps) => {
  const data = translateToLaunchKCScoreItems(scoreData)

  return (
    <div className="flex flex-col gap-2 mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="font-semibold text-text-tertiary text-xs">
            {item.name}
          </span>

          <Scores name={item.name} score={sanitizeNumber(item.score)} />
        </div>
      ))}
    </div>
  )
}
