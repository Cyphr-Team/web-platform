import { ErrorCode } from "@/utils/custom-error"

export interface SuccessResponse {
  success: boolean
}
export interface ErrorResponse {
  message?: string
  code: ErrorCode
}

// RESEND CODE
export interface ResendCodeRequest {
  email: string
}

export interface ResendCodeResponse {
  email: string
}

export enum UserStatus {
  UNVERIFIED,
  REGISTERING,
  ACTIVE,
  DISABLED
}

export interface UserInfo {
  accessToken: string
  expiresIn: number
  refreshToken: string
  roles: string[]
  tokenType: string
  username: string
  status?: UserStatus
}

// Auth
export enum SocialProvider {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE"
}
