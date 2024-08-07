import { LoanApplicationStatus } from "../loan-application.type"

/**
 * Application Score
 */

interface IScore {
  [key: string]: number
}

interface ILaunchKCApplicationScore extends IScore {
  productOrService: number
  marketOpportunity: number
  businessModel: number
  execution: number
  // Note that because of the "axios-case-converter"
  // LaunchKCFit will become launch_kcfit if we receive from the server
  // and launch_kcfit will become LaunchKCFit or LaunchKcfit
  //     (based on the LaunchKCScoreRequest that we defined in the server) if we request to the server
  launchKcfit: number
}

interface IApplicationScore<T> {
  score?: T
  applicationCaptureStage: LoanApplicationStatus
  scoredAt?: string
  comment?: string
}

/**
 * Application Scores Detail
 */
interface IScoreInfo<T> {
  judgeName: string
  score?: T
  scoredAt?: string
  comment?: string
}

interface IScoresItemByStage<T> {
  stage: string
  scoreInfo: IScoreInfo<T>[]
}

interface IApplicationScoresResponse<T> {
  id: string
  applicationId: string
  scores: IScoresItemByStage<T>[]
}

export type {
  IScore,
  IScoreInfo,
  IApplicationScore,
  ILaunchKCApplicationScore,
  IApplicationScoresResponse
}
