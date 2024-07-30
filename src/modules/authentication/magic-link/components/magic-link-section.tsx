import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useCallback, useEffect, useState } from "react"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Mail } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { inMemoryJWTService } from "@/services/jwt.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SESSION_DURATION_MINUTES } from "../constants/session"

export function MagicLinkSection() {
  const stytchClient = useStytchB2BClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  /**
   * Handles the Stytch callback for magic link authentication.
   * This function is responsible for authenticating the magic link token and performing the necessary actions based on the authentication result.
   * If the token is valid, it transfers the refresh token, checks the user role, and navigates to the appropriate page.
   * If the token is not present or invalid, it sets the email from the query parameters.
   * @returns {Promise<void>} A promise that resolves when the authentication process is completed.
   */
  const handleStytchCallback = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.has("token")) {
        await stytchClient.magicLinks.authenticate({
          magic_links_token: searchParams.get("token") ?? "",
          session_duration_minutes: SESSION_DURATION_MINUTES
        })
        inMemoryJWTService.transferRefreshToken()
        if (checkIsLoanApplicant()) {
          navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
        } else {
          navigate(APP_PATH.INDEX)
        }
      } else if (searchParams.has("email")) {
        setEmail(searchParams.get("email") ?? "")
      }
    } catch (e) {
      toastError({
        ...TOAST_MSG.user.stytchMagicLink,
        description: "Failed to authenticate magic link or it was expired"
      })
    }
  }, [navigate, stytchClient.magicLinks])

  useEffect(() => {
    handleStytchCallback()
  }, [handleStytchCallback])

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
      <div className="flex flex-col text-center">
        <div className="flex justify-center relative">
          <img
            className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
            src={backgroundPatternDecorative}
            alt="Pattern decorative"
            width={756}
            height={756}
          />
          <div className="w-[56px] self-center">
            <AspectRatio ratio={1 / 1}>
              <div className="w-full h-full border flex justify-center items-center rounded-xl">
                <Mail size={28} />
              </div>
            </AspectRatio>
          </div>
        </div>
        {email ? (
          <>
            <h1 className="text-3xl font-semibold tracking-tight mt-6">
              Check your email
            </h1>

            <div className="text-muted-foreground mt-3">
              <p>We sent a verification link to</p>
              <p className="font-medium">{email}</p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold tracking-tight mt-6">
              Authenticating....
            </h1>

            <div className="text-muted-foreground mt-3">
              <p>
                You will be redirected to home page once the magic link is
                verified.
              </p>
            </div>
          </>
        )}
      </div>

      <Button
        variant="link"
        className="px-1 text-sm text-foreground py-0 self-center"
        asChild
      >
        <Link to={APP_PATH.LOGIN}>
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to log in
        </Link>
      </Button>
    </div>
  )
}
