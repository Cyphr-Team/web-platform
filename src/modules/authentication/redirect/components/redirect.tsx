import { ArrowLeft } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useCallback, useEffect, useState } from "react"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Mail } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SESSION_DURATION_MINUTES } from "../constants/session"
import { RedirectParam } from "../constants/params"

export function RedirectSection() {
  const stytchClient = useStytchB2BClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [searchParams] = useSearchParams()

  /**
   * Handle redirect from Stytch B2B login flow after a user has been authenticated.
   *
   * @remarks
   * This function is called on the redirect page after a user has been authenticated
   * via the Stytch B2B login flow. It uses the `stytch_token_type` and `token` query
   * params to authenticate the user with Stytch and log them in.
   *
   * If the user is a loan applicant, it redirects them to the loan application
   * page. Otherwise, it redirects them to the dashboard.
   *
   * @see {@link https://stytch.com/docs/api/b2b/oauth#flow}
   */
  const handleStytchCallback = useCallback(async () => {
    try {
      const stytch_token_type = searchParams.get(
        RedirectParam.STYTCH_TOKEN_TYPE
      )
      const token = searchParams.get(RedirectParam.TOKEN)
      if (stytch_token_type && token) {
        if (stytch_token_type === RedirectParam.OAUTH) {
          stytchClient.oauth.authenticate({
            oauth_token: token,
            session_duration_minutes: SESSION_DURATION_MINUTES
          })
        } else if (stytch_token_type === RedirectParam.MAGIC_LINKS) {
          stytchClient.magicLinks.authenticate({
            magic_links_token: token,
            session_duration_minutes: 60
          })
        }
        if (checkIsLoanApplicant()) {
          navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
        } else {
          navigate(APP_PATH.INDEX)
        }
      } else if (searchParams.has(RedirectParam.EMAIL)) {
        setEmail(searchParams.get(RedirectParam.EMAIL) ?? "")
      }
    } catch (e) {
      toastError({
        ...TOAST_MSG.user.stytchMagicLink,
        description: "Failed to authenticate magic link or it was expired"
      })
    }
  }, [navigate, searchParams, stytchClient.magicLinks, stytchClient.oauth])

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
                You will be redirected to home page once your account is
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
