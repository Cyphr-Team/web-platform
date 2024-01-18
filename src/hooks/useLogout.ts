import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  const clearUserInfo = useCallback(() => {
    inMemoryJWTService.eraseToken()
    sessionStorage.clear()
  }, [])

  const signOut = useCallback(() => {
    clearUserInfo()
    navigate(APP_PATH.LOGIN, { replace: true })
  }, [navigate, clearUserInfo])

  return { signOut }
}
