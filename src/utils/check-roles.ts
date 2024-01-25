import { USER_ROLES } from "@/common"
import { inMemoryJWTService } from "@/services/jwt.service"

export const checkIsLoanApplicant = () => {
  const userInfo = inMemoryJWTService.getUserInfo()
  if (!userInfo) return false

  return userInfo.roles.includes(USER_ROLES.LOAN_APPLICANT.toLowerCase())
}
