// ENUM
enum UserRoles {
  LOAN_OFFICER = "LOAN_OFFICER",
  LOAN_APPLICANT = "LOAN_APPLICANT",
  FORESIGHT_ADMIN = "FORESIGHT_ADMIN",
  CDFI_ADMIN = "CDFI_ADMIN"
}
enum UserStatus {
  UNVERIFIED = "UNVERIFIED",
  REGISTERING = "REGISTERING",
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED"
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

interface UserDetailInfo {
  id: string
  institutionId: string
  authId: string
  name: string
  email: string
  avatar: string
  status: UserStatus
  roles: UserRoles[]
  loggedInAt: string
  authProvider: string
  createdAt: string
}

export type { UserInfo, UserDetailInfo }
