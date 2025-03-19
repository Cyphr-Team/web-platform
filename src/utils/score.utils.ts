import { type ILaunchKCApplicationAssignScore } from "@/types/application/application-assign.type"
import {
  type IApplicationScoresResponse,
  type IScore
} from "@/types/application/application-score.type"
import { type LoanApplicationStatus } from "@/types/loan-application.type"
import { sum } from "lodash"

/* Application Scoring */

// Round Score = Sum of all scores in a round / Total Length
// Note: Only update score (not zero) when ALL judges completed scoring
export const calculateAvgScorePerRound = <T extends IScore>(
  data: IApplicationScoresResponse<T> | undefined,
  round: LoanApplicationStatus
): number => {
  if (!data) return 0
  const roundData = data?.scores?.find(
    (item) => item?.stage.toLowerCase() === round.toLowerCase()
  )

  if (!roundData) return 0

  if (roundData.scoreInfo.length === 0) return 0

  const scoredJudges = roundData.scoreInfo.filter(
    (score) => score.scoredAt !== undefined
  )
  const totalScores =
    sum(scoredJudges.map((score) => sum(Object.values(score.score ?? {})))) / 5

  // Round to 1 decimal
  return Math.round((totalScores / scoredJudges.length) * 10) / 10
}

// Total Score = (Avg Score 1 + Avg Score 2) / 2
export const calculateTotalScore = (
  round1Score: number,
  round2Score: number
) => {
  return Math.round(((round1Score + round2Score) / 2) * 10) / 10
}

// Translate interface to array of LaunchKC Scores
export const translateToLaunchKCScoreItems = (
  launchKCScore?: ILaunchKCApplicationAssignScore
) => {
  return [
    { name: "PRODUCT OR SERVICE", score: launchKCScore?.productOrServiceScore },
    {
      name: "MARKET OPPORTUNITY",
      score: launchKCScore?.marketOpportunityScore
    },
    { name: "BUSINESS MODEL", score: launchKCScore?.businessModelScore },
    { name: "EXECUTION", score: launchKCScore?.executionScore },
    { name: "LAUNCHKC FIT", score: launchKCScore?.launchKcfitScore }
  ]
}
