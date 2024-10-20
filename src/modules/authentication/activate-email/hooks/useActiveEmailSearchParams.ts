import { useSearchParams } from "react-router-dom"
import { type UserStartStatus } from "../../hooks/useGetStart"
import { parseJwt } from "@/services/jwt.service"

export const useActiveEmailSearchParams = () => {
  const [searchParams] = useSearchParams()
  const email =
    searchParams.get("email") ??
    parseJwt(searchParams.get("token")!)?.email ??
    ""
  const status = (searchParams.get("status") ?? "") as UserStartStatus

  return { email, status }
}
