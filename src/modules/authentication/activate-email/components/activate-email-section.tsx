import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { ActivateEmailForm } from "./activate-email-form"
import { Link, createSearchParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { cn } from "@/lib/utils"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"

export function ActivateEmailSection() {
  const { status, email } = useActiveEmailSearchParams()

  const isWaitingSetupProfile =
    status === UserStartStatus.USER_WAITING_SETUP_PROFILE
  const isEmailRegistered = status === UserStartStatus.EMAIL_REGISTERED

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]",
        (isWaitingSetupProfile || isEmailRegistered) && "space-y-4"
      )}
    >
      <ActivateEmailForm />

      {isWaitingSetupProfile ? (
        <p className="px-8 text-center text-sm text-muted-foreground">
          Request a new instruction?{" "}
          <Button
            variant="link"
            className="px-1 text-sm text-foreground py-0 self-center"
            asChild
          >
            <Link
              to={{
                pathname: APP_PATH.SIGN_UP,
                search: createSearchParams({ email }).toString()
              }}
            >
              Back to sign up
            </Link>
          </Button>
        </p>
      ) : (
        <Button
          variant="link"
          className="px-1 text-sm text-foreground py-0 self-center"
          asChild
        >
          <Link
            to={{
              pathname: APP_PATH.LOGIN,
              search: createSearchParams({ email }).toString()
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to log in
          </Link>
        </Button>
      )}
    </div>
  )
}
