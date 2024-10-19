import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { Link, createSearchParams } from "react-router-dom"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"

export function BackToLoginButton() {
  const { email } = useActiveEmailSearchParams()

  return (
    <Button asChild className="ml-auto w-full text-base">
      <Link
        to={{
          pathname: APP_PATH.LOGIN,
          search: createSearchParams({ email }).toString()
        }}
      >
        Go to Login
      </Link>
    </Button>
  )
}
