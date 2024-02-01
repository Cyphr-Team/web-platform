// ENUM
enum UserRoles {
  LOAN_OFFICER = "LOAN_OFFICER",
  LOAN_APPLICANT = "LOAN_APPLICANT",
  FORESIGHT_ADMIN = "FORESIGHT_ADMIN",
  CDFI_ADMIN = "CDFI_ADMIN"
}
enum UserStatus {
  UNVERIFIED,
  REGISTERING,
  ACTIVE,
  DISABLED
}

export { UserStatus, UserRoles }

// INTERFACE
interface UserInfo {
  accessToken: string
  expiresIn: number
  refreshToken: string
  roles: string[]
  tokenType: string
  username: string
  status?: UserStatus
  avatar?: string
}

export type { UserInfo }
