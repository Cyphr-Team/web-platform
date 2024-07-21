import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import { ChevronDown, ChevronRight } from "lucide-react"
import { ScoreCardDetail } from "../molecules/ScoreCardDetail"

const calculateAverageScore = (
  scores: ILaunchKCApplicationAssignScore
): number => {
  const totalScore = Object.values(scores).reduce((sum, item) => sum + item, 0)
  const averageScore = totalScore / Object.values(scores).length
  return Math.round(averageScore * 10) / 10 // Round to one decimal place
}

// Generics Props: We can use this to pass any type of score data
// Example: ILaunchKCApplicationAssignScore, IAnotherBankApplicationScore, etc.
interface IScoreCardByJudgeProps<T = ILaunchKCApplicationAssignScore> {
  id: string
  name: string
  scoreData?: T
}

export const ScoreCardListDetailByJudge = ({
  id,
  name,
  scoreData
}: IScoreCardByJudgeProps) => {
  const avgScore = scoreData ? calculateAverageScore(scoreData) : 0

  return (
    <AccordionItem value={id} key={id} className="border-b-0">
      <AccordionTrigger
        className={cn(
          "justify-between w-full hover:no-underline text-base font-medium text-left data-[state=open]:border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
        )}
        openIcon={
          <ChevronRight className="w-4 shrink-0 transition-transform duration-200" />
        }
        closeIcon={
          <ChevronDown className="w-4 shrink-0 transition-transform duration-200" />
        }
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-sm">{name}</span>

          <span
            className={cn(
              "flex items-center text-xs font-semibold",
              avgScore == 0 && "text-gray-200"
            )}
          >
            <span>
              {avgScore}
              <span className="text-black">/5</span>
            </span>
            <Icons.rocket className="w-4 ml-1" />
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <ScoreCardDetail scoreData={scoreData} />
      </AccordionContent>
    </AccordionItem>
  )
}
