import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useActivateEmailByLink } from "./useActivateEmailByLink"
import { inMemoryJWTService } from "@/services/jwt.service"
import { useQueryClient } from "@tanstack/react-query"
import { APP_PATH } from "@/constants"

export const useActivateEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { mutate, isPending } = useActivateEmailByLink()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) return

    const verifying = async () => {
      mutate(
        { token },
        {
          onSuccess({ data }) {
            const { accessToken, refreshToken, expiresIn } = data

            inMemoryJWTService.setToken(accessToken, expiresIn)
            inMemoryJWTService.setRefreshToken(refreshToken)
            inMemoryJWTService.setUserInfo(data)
            queryClient.resetQueries()

            navigate(APP_PATH.SETUP_PROFILE_BY_TOKEN.detail(data.username))
          }
        }
      )
    }

    verifying()
  }, [mutate, navigate, queryClient, searchParams])

  return { isPending }
}
