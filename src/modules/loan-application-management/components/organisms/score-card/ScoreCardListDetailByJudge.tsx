import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import { ChevronDown, ChevronRight } from "lucide-react"
import { ScoreCardDetail } from "../../molecules/score-card/ScoreCardDetail"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { PropsWithChildren } from "react"

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
  scoredDate?: string
}

export const ScoreCardListDetailByJudge = ({
  id,
  name,
  scoreData,
  scoredDate
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

          <Layout isCompleted={!!scoredDate}>
            <span
              className={cn(
                "flex items-center text-xs font-semibold",
                !scoredDate && "text-gray-200"
              )}
            >
              <span>
                {avgScore}
                <span className="text-black">/5</span>
              </span>

              <Icons.rocket className="w-4 ml-1" />
            </span>
          </Layout>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <ScoreCardDetail scoreData={scoreData} />
      </AccordionContent>
    </AccordionItem>
  )
}

interface LayoutProps extends PropsWithChildren {
  isCompleted: boolean
}

const Layout = (props: LayoutProps) => {
  const { isCompleted, children } = props

  if (isCompleted) return children

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-black transform" sideOffset={0}>
          <div className="text-white max-w-72 font-light text-xs">
            Scorecard incomplete
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
