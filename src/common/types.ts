export interface ErrorResponse {
  message?: string
  code: string
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
