import {
  IApplicationScoreByStage,
  IApplicationWithStageScoresResponse,
  ILaunchKCApplicationAssignScore,
  IScoreInfo,
  IStageInfo,
  IWorkspaceAdminApplicationScore
} from "@/types/application/application-assign.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { roundToOneDecimalPlace, sanitizeNumber } from "@/utils"
import { LoanStage } from "../constants/types/application"

const NUMBER_OF_LAUNCH_KC_SCORES = 5

const getTotalScore = (
  score?: ILaunchKCApplicationAssignScore | null
): number => {
  const totalScore =
    sanitizeNumber(score?.businessModelScore) +
    sanitizeNumber(score?.executionScore) +
    sanitizeNumber(score?.launchKcfitScore) +
    sanitizeNumber(score?.marketOpportunityScore) +
    sanitizeNumber(score?.productOrServiceScore)

  return totalScore
}

const getAverageScore = (listScoreInfo?: IScoreInfo[]): number => {
  const numberOfJudge = sanitizeNumber(listScoreInfo?.length)

  if (!listScoreInfo || numberOfJudge == 0) return 0

  // Get the total score of each judge
  const totalScore = listScoreInfo.reduce(
    (averageScore, scoreInfo) => averageScore + getTotalScore(scoreInfo?.score),
    0
  )

  return roundToOneDecimalPlace(
    totalScore / NUMBER_OF_LAUNCH_KC_SCORES / numberOfJudge
  )
}

const getStageScoreInfo = (
  applicationScoreByStages: IApplicationScoreByStage[] = [],
  round: LoanApplicationStatus | LoanStage
): IStageInfo => {
  const listScoreInfoForRound = applicationScoreByStages
    .filter(
      (scoreByStage) =>
        scoreByStage.stage?.toUpperCase() === round.toUpperCase()
    )
    ?.map((applicationScore) => applicationScore?.scoreInfo)
    ?.flat()

  const avgScore = getAverageScore(listScoreInfoForRound)

  const scoredJudges = listScoreInfoForRound.filter(
    (scoreInfo) => !!scoreInfo?.score
  )

  return {
    judges: listScoreInfoForRound,
    avgScore,
    numberOfScoredJudge: scoredJudges?.length,
    scoredJudges
  }
}

/**
 * Transforms the server response into a format suitable for UI display.
 * This function extracts and structures the necessary data from the server response
 * to ensure it can be easily consumed and displayed by the user interface.
 */
const getWorkspaceAdminApplicationScores = (
  applicationScoreListResponse: IApplicationWithStageScoresResponse[]
): IWorkspaceAdminApplicationScore[] => {
  return applicationScoreListResponse.map((applicationScore) => {
    const roundOneScore = getStageScoreInfo(
      applicationScore?.stages,
      LoanApplicationStatus.ROUND_1
    )

    const roundTwoScore = getStageScoreInfo(
      applicationScore?.stages,
      LoanApplicationStatus.ROUND_2
    )

    return {
      ...applicationScore,
      roundOne: roundOneScore,
      roundTwo: roundTwoScore
    }
  })
}

export { getStageScoreInfo, getWorkspaceAdminApplicationScores }
