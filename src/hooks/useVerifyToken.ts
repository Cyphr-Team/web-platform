import { inMemoryJWTService, parseJwt } from "@/services/jwt.service"
import { getSubdomain } from "@/utils/domain.utils"

/**
 *
 * @returns parseToken.institution_subdomain === getSubdomain()
 */
export const useVerifyToken = (): boolean => {
  const token = inMemoryJWTService.getToken()
  const parseToken = parseJwt(token ?? "")

  return parseToken?.institution_subdomain === getSubdomain()
}
