import { formatDate } from "@/utils/date.utils.ts"
import { IScoreInfo } from "@/types/application/application-score.type.ts"
import { ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type.ts"

interface Props {
  feedbackList: IScoreInfo<ILaunchKCApplicationAssignScore>[]
}

export const FeedbackCardDetail = ({ feedbackList }: Props) => {
  return (
    <div className="max-h-96 overflow-auto ">
      {feedbackList.map(({ judgeName, scoredAt, comment }) => (
        <div className="py-2 px-1" key={judgeName}>
          <div className="font-semibold">{judgeName}</div>

          <div className="text-text-secondary">
            {formatDate(scoredAt, "MMM dd, yyyy")}
          </div>
          <div className="text-text-tertiary mt-2">{comment}</div>
        </div>
      ))}
    </div>
  )
}
