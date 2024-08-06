import { formatDate } from "@/utils/date.utils.ts"

interface Props {
  judgeName: string
  scoredAt?: string
  feedback?: string
}

export const FeedbackCardDetail = ({
  judgeName,
  scoredAt,
  feedback
}: Props) => {
  return (
    <div className="p-2">
      <div className="block font-semibold">{judgeName}</div>

      <div className="text-text-secondary">
        {formatDate(scoredAt, "MMM dd, yyyy")}
      </div>
      <div className="text-text-tertiary mt-2">{feedback}</div>
    </div>
  )
}
