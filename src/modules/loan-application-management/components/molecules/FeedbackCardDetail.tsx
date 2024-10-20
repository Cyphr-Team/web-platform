import { formatDate } from "@/utils/date.utils.ts"
import { type IScoreInfo } from "@/types/application/application-score.type.ts"
import { type ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type.ts"
import { CircleUserRound } from "lucide-react"
import { cn } from "@/lib/utils.ts"

interface Props {
  feedbackList: IScoreInfo<ILaunchKCApplicationAssignScore>[]
}

export function FeedbackCardDetail({ feedbackList }: Props) {
  return (
    <div className="max-h-96 overflow-auto flex flex-col gap-y-2 ">
      {feedbackList.map(({ judgeName, scoredAt, comment }) => (
        <div key={judgeName} className="flex gap-2 py-2 items-start">
          <CircleUserRound className="opacity-70 h-5" />

          <div>
            <div className="flex gap-4 justify-start items-center">
              <div className="font-semibold">{judgeName}</div>

              <div
                className={cn(
                  "text-text-secondary text-center text-xs",
                  !scoredAt ? "italic" : null
                )}
              >
                {scoredAt
                  ? formatDate(scoredAt, "MMM dd, yyyy")
                  : "(Scorecard incomplete)"}
              </div>
            </div>

            <div className="text-text-tertiary mt-2">{comment}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
