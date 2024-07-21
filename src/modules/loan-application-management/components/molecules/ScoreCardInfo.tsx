import { LoanApplicationStatus } from "@/types/loan-application.type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { ScoreCardBox } from "../atoms/ScoreCardBox"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"

interface IScoreCardInfo {
  name: string
  score: number
  stage?: string
}

export const ScoreCardInfo = ({ name, score, stage }: IScoreCardInfo) => {
  return (
    <div>
      <ScoreCardBox name={name} score={score} />
      <div className="flex justify-between items-center">
        <span className="text-xs">Application round</span>
        <StatusRoundBadge round={(stage ?? "") as LoanApplicationStatus}>
          {capitalizeWords(snakeCaseToText(stage ?? ""))}
        </StatusRoundBadge>
      </div>
    </div>
  )
}
