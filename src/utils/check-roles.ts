import { UserRoles } from "@/types/user.type"
import { inMemoryJWTService } from "@/services/jwt.service"

const getUserRoles = () => {
  const userInfo = inMemoryJWTService.getUserInfo()

  if (!userInfo) return []
  if (!Array.isArray(userInfo.roles)) return []

  return userInfo.roles
}

const mapRoleToDisplay = (role: UserRoles) => {
  switch (role.toUpperCase()) {
    case UserRoles.CDFI_ADMIN:
      return "Lender Admin"
    case UserRoles.LOAN_OFFICER:
      return "Loan Officer"
    case UserRoles.LOAN_APPLICANT:
      return "Loan Applicant"
    case UserRoles.FORESIGHT_ADMIN:
      return "Foresight Admin"
    default:
      return "Unknown"
  }
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

const checkIsForesightAdmin = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return userInfo.roles.includes(UserRoles.FORESIGHT_ADMIN.toLowerCase())
}

const checkRolesMatchWithUserRoles = (roles: UserRoles[]) => {
  const userRoles = getUserRoles()

  return roles.some((role) => userRoles.includes(role.toLowerCase()))
}

const checkIsLenderAdmin = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return userInfo.roles.includes(UserRoles.CDFI_ADMIN.toLowerCase())
}

export {
  mapRoleToDisplay,
  checkIsLenderAdmin,
  checkIsForesightAdmin,
  checkIsLoanApplicant,
  checkRolesMatchWithUserRoles,
  checkIsLoanOfficer
}
