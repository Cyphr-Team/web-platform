import {
  IApplicationScoresResponse,
  ILaunchKCApplicationScore,
  IScore
} from "@/types/application/application-score.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"

/* Application Scoring */

// Round Score = Sum of all scores in a round / Total Length
// Note: Only update score (not zero) when ALL judges completed scoring
export const calculateAvgScorePerRound = <T extends IScore>(
  data: IApplicationScoresResponse<T> | undefined,
  round: LoanApplicationStatus
): number => {
  if (!data) return 0
  const roundData = data.scores.find(
    (item) => item.stage === round.toLowerCase()
  )
  if (!roundData) return 0

  const totalScores = roundData.scoreInfo.reduce((acc, scoreData) => {
    const sumOfScores = Object.values(scoreData.score).reduce(
      (sum, scoreItem) => sum + scoreItem,
      0
    )
    return acc + sumOfScores
  }, 0)
  const numberOfScores = roundData.scoreInfo.length * 5
  return Math.round((totalScores / numberOfScores) * 10) / 10
}

// Total Score = (Avg Score 1 + Avg Score 2) / 2
// If overall round score is 0, return 0
export const calculateTotalScore = (
  round1Score: number,
  round2Score: number
) => {
  if (round1Score == 0 || round2Score == 0) return 0
  return Math.round(((round1Score + round2Score) / 2) * 10) / 10
}

// Translate interface to array of LaunchKC Scores
export const translateToLaunchKCScoreItems = (
  launchKCScore: ILaunchKCApplicationScore
) => {
  return [
    { name: "PRODUCT OR SERVICE", score: launchKCScore.productOrServiceScore },
    { name: "MARKET OPPORTUNITY", score: launchKCScore.marketOpportunityScore },
    { name: "BUSINESS MODEL", score: launchKCScore.businessModelScore },
    { name: "EXECUTION", score: launchKCScore.executionScore },
    { name: "LAUNCHKC FIT", score: launchKCScore.launchKcfitScore }
  ]
}
