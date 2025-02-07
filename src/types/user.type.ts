/**
 * Enumeration representing different user roles within a financial institution or platform.
 */
enum UserRoles {
  /**
   * The judge is the person who invited by workspace admin to view and score the application
   */
  JUDGE = "JUDGE",

  /**
   * The loan applicant is the person who applies for loan programs
   */
  APPLICANT = "APPLICANT",

  /**
   * The reviewer who processes review for the applications applied for loan programs.
   */
  REVIEWER = "REVIEWER",

  /**
   * The viewer who has read-only access to view applications without making changes.
   */
  VIEWER = "VIEWER",

  /**
   * The institution administrator with administrative control over organizational settings and
   * user management within the specific financial institution.
   */
  WORKSPACE_ADMIN = "WORKSPACE_ADMIN",

  /**
   * The platform administrator with advanced privileges, overseeing and managing the whole system,
   * which may include configuration, monitoring, and maintenance the financial institutions.
   */
  PLATFORM_ADMIN = "PLATFORM_ADMIN"
}

const applicantRoles = () => {
  return [UserRoles.APPLICANT]
}

const applicantRole = () => {
  return UserRoles.APPLICANT
}

const reviewerRole = () => {
  return UserRoles.REVIEWER
}

const reviewerRoles = () => {
  return [UserRoles.REVIEWER]
}

const workspaceAdminRole = () => {
  return UserRoles.WORKSPACE_ADMIN
}

const workspaceAdminRoles = () => {
  return [UserRoles.WORKSPACE_ADMIN]
}

const platformAdminRoles = () => {
  return [UserRoles.PLATFORM_ADMIN]
}

const platformAdminRole = () => {
  return UserRoles.PLATFORM_ADMIN
}

const judgeRoles = () => {
  return [UserRoles.JUDGE]
}

const judgeRole = () => {
  return UserRoles.JUDGE
}

const viewerRole = () => {
  return UserRoles.VIEWER
}

const viewerRoles = () => {
  return [UserRoles.VIEWER]
}

export {
  judgeRoles,
  judgeRole,
  applicantRoles,
  applicantRole,
  reviewerRole,
  reviewerRoles,
  workspaceAdminRole,
  workspaceAdminRoles,
  platformAdminRoles,
  platformAdminRole,
  viewerRole,
  viewerRoles
}

enum UserStatus {
  UNVERIFIED = "UNVERIFIED",
  ACTIVE = "ACTIVE",
  PENDING = "PENDING"
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

interface WhitelistedUser {
  id: string
  userId: string
  featureFlagId: string
}

interface WhitelistedUserResponse {
  id: string
  userId: string
  featureFlagId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type {
  UserInfo,
  WhitelistedUser,
  UserDetailInfo,
  WhitelistedUserResponse
}
