import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  const clearUserInfo = useCallback(async () => {
    inMemoryJWTService.eraseToken()
    sessionStorage.clear()
  }, [])

  const signOut = useCallback(async () => {
    clearUserInfo()
    navigate(APP_PATH.LOGIN, { replace: true })
  }, [clearUserInfo, navigate])

  return { signOut, clearUserInfo }
}
