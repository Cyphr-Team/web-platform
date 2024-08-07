import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { isAdmin } from "@/utils/domain.utils"
import { isEnableMultiFactorAuthentication } from "@/utils/feature-flag.utils"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const stytchClient = useStytchB2BClient()
  const navigate = useNavigate()
  const clearUserInfo = useCallback(async () => {
    inMemoryJWTService.eraseToken()
    sessionStorage.clear()
    if (isEnableMultiFactorAuthentication() && !isAdmin()) {
      try {
        await stytchClient.session.revoke()
      } catch (e) {
        console.error("Failed to revoke Stytch session", e)
      }
    }
  }, [stytchClient.session])

  const signOut = useCallback(async () => {
    clearUserInfo()
    navigate(APP_PATH.LOGIN, { replace: true })
  }, [clearUserInfo, navigate])

  return { signOut, clearUserInfo }
}
