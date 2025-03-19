import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { type ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import { sanitizeNumber } from "@/utils"
import { translateToLaunchKCScoreItems } from "@/utils/score.utils"

interface IScoreItem {
  name: string
  score: number
}

function Scores({ score }: IScoreItem) {
  return (
    <div className="flex flex-row-reverse">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Button
            key={5 - index}
            className={cn(
              // If the scored true, fill the color
              "[&>.score-rocket-icon>path]:data-[scored=true]:fill-inherit",
              // Init state
              "[&>.score-rocket-icon>path]:fill-transparent",
              "h-auto p-0.5 mx-0.5"
            )}
            variant="ghost"
            type="button"
            // Show only - no need to reverse order
            data-scored={score >= 5 - index}
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

export function ScoreCardDetail({ scoreData }: IScoreCardDetailProps) {
  const data = translateToLaunchKCScoreItems(scoreData)

  return (
    <div className="mt-4 flex flex-col gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-tertiary">
            {item.name}
          </span>

          <Scores name={item.name} score={sanitizeNumber(item.score)} />
        </div>
      ))}
    </div>
  )
}
