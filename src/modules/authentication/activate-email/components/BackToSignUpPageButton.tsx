import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowLeft } from "lucide-react"
import { Link, createSearchParams } from "react-router-dom"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"

export function BackToSignUpPageButton() {
  const { email } = useActiveEmailSearchParams()

  return (
    <Button
      asChild
      className="self-center px-1 py-0 text-sm text-foreground"
      variant="link"
    >
      <Link
        to={{
          pathname: APP_PATH.SIGN_UP,
          search: createSearchParams({ email }).toString()
        }}
      >
        <ArrowLeft className="mr-1 size-5" />
        Go to Sign up
      </Link>
    </Button>
  )
}
