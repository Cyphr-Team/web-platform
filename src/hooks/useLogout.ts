import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { isEnableMultiFactorAuthentication } from "@/utils/feature-flag.utils"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const stytchClient = useStytchB2BClient()
  const navigate = useNavigate()
  const clearUserInfo = useCallback(() => {
    inMemoryJWTService.eraseToken()
    sessionStorage.clear()
  }, [])

  const signOut = useCallback(async () => {
    clearUserInfo()
    if (isEnableMultiFactorAuthentication()) {
      try {
        await stytchClient.session.revoke()
      } catch (e) {
        console.error("Failed to revoke Stytch session", e)
      }
    }
    navigate(APP_PATH.LOGIN, { replace: true })
  }, [clearUserInfo, stytchClient.session, navigate])

  return { signOut, clearUserInfo }
}
