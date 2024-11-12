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
    <div className="flex max-h-96 flex-col gap-y-2 overflow-auto ">
      {feedbackList.map(({ judgeName, scoredAt, comment }) => (
        <div key={judgeName} className="flex items-start gap-2 py-2">
          <CircleUserRound className="h-5 opacity-70" />

          <div>
            <div className="flex items-center justify-start gap-4">
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

            <div className="mt-2 text-text-tertiary">{comment}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
