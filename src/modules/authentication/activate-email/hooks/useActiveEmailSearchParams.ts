import { useSearchParams } from "react-router-dom"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"

export const useActiveEmailSearchParams = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email") || ""
  const status = (searchParams.get("status") || "") as UserStartStatus

  return { email, status }
}
