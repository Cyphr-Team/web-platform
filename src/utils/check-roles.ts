import {
  applicantRoles,
  judgeRoles,
  platformAdminRoles,
  reviewerRoles,
  UserRoles,
  workspaceAdminRoles
} from "@/types/user.type"
import { inMemoryJWTService } from "@/services/jwt.service"

const getUserRoles = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return []
  if (!Array.isArray(userInfo.roles)) return []

  return userInfo.roles
}

const hasRole = (roles: string[], role: string): boolean => {
  return roles.includes(role.toLowerCase())
}

const checkIsLoanApplicant = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return isApplicant(userInfo.roles)
}

const checkIsLoanOfficer = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return isReviewer(userInfo.roles)
}

const checkIsForesightAdmin = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return false

  return isPlatformAdmin(userInfo.roles)
}

const checkRolesMatchWithUserRoles = (roles: UserRoles[]) => {
  const userRoles = getUserRoles()

  return roles.some((role) => userRoles.includes(role.toLowerCase()))
}

const checkIsWorkspaceAdmin = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return false

  return isWorkspaceAdmin(userInfo.roles)
}

const checkIsJudge = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return false

  return isJudge(userInfo.roles)
}

const isReviewerRole = (role: UserRoles): boolean => {
  return reviewerRoles().includes(role)
}

const isApplicant = (roles: string[]): boolean => {
  return applicantRoles().some((role) => hasRole(roles, role))
}

const isReviewer = (roles: string[]): boolean => {
  return reviewerRoles().some((role) => hasRole(roles, role))
}

const isWorkspaceAdmin = (roles: string[]): boolean => {
  return workspaceAdminRoles().some((role) => hasRole(roles, role))
}

const isPlatformAdmin = (roles: string[]): boolean => {
  return platformAdminRoles().some((role) => hasRole(roles, role))
}

const isJudge = (roles: string[]): boolean => {
  return judgeRoles().some((role) => hasRole(roles, role))
}

export {
  checkIsWorkspaceAdmin,
  checkIsForesightAdmin,
  checkIsLoanApplicant,
  checkRolesMatchWithUserRoles,
  checkIsLoanOfficer,
  checkIsJudge,
  isReviewerRole,
  isApplicant,
  isPlatformAdmin,
  isWorkspaceAdmin,
  isJudge
}
