import { LoanApplicationStatus } from "../loan-application.type"
import { LoanType } from "../loan-program.type"
import { UserDetailInfo } from "../user.type"
import {
  IApplicationScore,
  ILaunchKCApplicationScore
} from "./application-score.type"

interface IScoreInfo<T = IApplicationScore<ILaunchKCApplicationScore>> {
  judgeId: string
  judgeName: string
  judgeEmail: string
  judgeAvatar?: string
  score?: T | null
}

interface IApplicationScoreByStage<
  T = IApplicationScore<ILaunchKCApplicationScore>
> {
  stage: LoanApplicationStatus
  scoreInfo: IScoreInfo<T>[]
}

interface IApplicationWithStageScoresResponse<
  T = IApplicationScore<ILaunchKCApplicationScore>
> {
  id: string
  applicationIdNumber: number
  status: LoanApplicationStatus
  stage?: LoanApplicationStatus
  createdAt: string
  businessName?: string
  programType: LoanType
  submittedAt?: string
  stages: IApplicationScoreByStage<T>[]
}

interface IWorkspaceAdminApplicationScore
  extends IApplicationWithStageScoresResponse {
  roundOneJudges: IScoreInfo[]
  roundOneAvgScore: number
  roundOneNumberOfScoredJudge: number

  roundTwoJudges: IScoreInfo[]
  roundTwoAvgScore: number
  roundTwoNumberOfScoredJudge: number
}

interface JudgeInfo {
  id: string
  name: string
  email: string
  avatar?: string
}

const convertUserDetailInfoToJudgeInfo = (
  userDetail: UserDetailInfo
): JudgeInfo => {
  return {
    id: userDetail.id,
    name: userDetail.name,
    email: userDetail.email,
    avatar: userDetail.avatar // Optional field
  }
}

export type {
  IScoreInfo,
  IApplicationScoreByStage,
  IApplicationWithStageScoresResponse,
  IWorkspaceAdminApplicationScore,
  JudgeInfo
}

export { convertUserDetailInfoToJudgeInfo }
