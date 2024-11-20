import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useFinancialToolkitStore } from "@/modules/legacy-financial-projection/stores/useFinancialToolkitStore.ts"

export const useLogout = () => {
  const navigate = useNavigate()
  const x = useFinancialToolkitStore()
  const clearUserInfo = useCallback(async () => {
    inMemoryJWTService.eraseToken()
    sessionStorage.clear()
  }, [])

  const signOut = useCallback(async () => {
    clearUserInfo()
    x.action.chong("")
    navigate(APP_PATH.LOGIN, { replace: true })
  }, [clearUserInfo, navigate, x.action])

  return { signOut, clearUserInfo }
}
