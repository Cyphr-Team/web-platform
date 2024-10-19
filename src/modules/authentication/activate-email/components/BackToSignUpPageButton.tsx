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
      className="px-1 text-sm text-foreground py-0 self-center"
      variant="link"
    >
      <Link
        to={{
          pathname: APP_PATH.SIGN_UP,
          search: createSearchParams({ email }).toString()
        }}
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Go to Sign up
      </Link>
    </Button>
  )
}
