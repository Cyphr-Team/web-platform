import { UserRoles } from "@/types/user.type"
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

  return userInfo.roles.includes(UserRoles.LOAN_APPLICANT.toLowerCase())
}

const checkIsLoanOfficer = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return userInfo.roles.includes(UserRoles.LOAN_OFFICER.toLowerCase())
}

const checkRolesMatchWithUserRoles = (roles: UserRoles[]) => {
  const userRoles = getUserRoles()

  return roles.some((role) => userRoles.includes(role.toLowerCase()))
}

export {
  checkIsLoanApplicant,
  checkRolesMatchWithUserRoles,
  checkIsLoanOfficer
}
