import { USER_ROLES } from "@/common"
import { inMemoryJWTService } from "@/services/jwt.service"

const getUserRoles = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return []
  if (!Array.isArray(userInfo.roles)) return []

  return userInfo.roles
}

const checkIsLoanApplicant = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return userInfo.roles.includes(USER_ROLES.LOAN_APPLICANT.toLowerCase())
}

const checkRolesMatchWithUserRoles = (roles: USER_ROLES[]) => {
  const userRoles = getUserRoles()

  return roles.some((role) => userRoles.includes(role.toLowerCase()))
}

export { checkIsLoanApplicant, checkRolesMatchWithUserRoles }
