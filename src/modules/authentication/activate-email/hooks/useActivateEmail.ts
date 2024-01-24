import { useEffect } from "react"
import {
  createSearchParams,
  useNavigate,
  useSearchParams
} from "react-router-dom"
import { useActivateEmailByLink } from "./useActivateEmailByLink"
import { useQueryClient } from "@tanstack/react-query"
import { APP_PATH } from "@/constants"
import { getAxiosError } from "@/utils/custom-error"

export const useActivateEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { mutate, isPending, isSuccess, error } = useActivateEmailByLink()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) return

    const verifying = async () => {
      mutate(
        { token },
        {
          onSuccess({ data }) {
            const { accessToken, username } = data

            navigate({
              pathname: APP_PATH.SETUP_PROFILE,
              search: createSearchParams({
                token: accessToken,
                email: username
              }).toString()
            })
          }
        }
      )
    }

    verifying()
  }, [mutate, navigate, queryClient, searchParams])

  return {
    isPending,
    isSuccess,
    errorCode: getAxiosError(error).code
  }
}
