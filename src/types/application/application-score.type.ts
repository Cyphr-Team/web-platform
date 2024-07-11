import { LoanApplicationStatus } from "../loan-application.type"

/**
 * Application Score
 */
interface ILaunchKCApplicationScore {
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
}

export type { ILaunchKCApplicationScore, IApplicationScore }
