import { type UserDetailInfo } from "../user.type"

export interface IGetActiveNudgeResponse {
  users: UserDetailInfo[]
}

export interface ISendNudgeRequest {
  applicationId: string
  judgeId: string
  email: string
}

export interface ISendNudgeResponse {
  token: string
}
