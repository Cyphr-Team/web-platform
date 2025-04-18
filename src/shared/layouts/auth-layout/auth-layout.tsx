import { APP_PATH } from "@/constants"
import { inMemoryJWTService } from "@/services/jwt.service"
import { BgGradient } from "@/shared/atoms/bg-gradient"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useMount } from "react-use"

export function AuthLayout() {
  const [checkLoggedIn, setCheckLoggedIn] = useState(true)
  const navigate = useNavigate()

  // check if user is logged in, navigate to homepage
  useMount(() => {
    inMemoryJWTService
      .getNewAccessToken()
      .then(() => {
        navigate(APP_PATH.INDEX, { replace: true })
      })
      .catch(() => {
        // Do nothing
      })
      .finally(() => {
        setCheckLoggedIn(false)
      })
  })

  if (checkLoggedIn) return <Loader2 className="animate-spin" />

  return (
    <div>
      <Outlet />
      <BgGradient />
    </div>
  )
}
