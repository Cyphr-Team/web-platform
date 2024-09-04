import { ArrowLeft, KeySquare } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { useCallback, useEffect, useRef, useState } from "react"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { RedirectParam } from "../constants/params"
import { SocialProvider } from "../../../../types/auth.type"
import { useLoginWithSocialMFA } from "../../../../hooks/login-with-social/useLoginWithSocialMFA"
import { SESSION_DURATION_MINUTES } from "../constants/session"

export function RedirectSection() {
  const { mutate: loginBySocialMutate } = useLoginWithSocialMFA()
  const stytchClient = useStytchB2BClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [searchParams] = useSearchParams()
  const initialized = useRef(false)

  const getTokenType = useCallback((): RedirectParam | null => {
    const value = searchParams.get(RedirectParam.STYTCH_TOKEN_TYPE)
    if (!value) return null
    return value as RedirectParam
  }, [searchParams])

  const loginByMagicLink = useCallback(
    async (token: string) => {
      await stytchClient.magicLinks.authenticate({
        magic_links_token: token,
        session_duration_minutes: SESSION_DURATION_MINUTES
      })
      if (checkIsLoanApplicant()) {
        navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
      } else {
        navigate(APP_PATH.INDEX)
      }
    },
    [navigate, stytchClient]
  )

  /**
   * Handle redirect from Stytch B2B login flow after a user has been authenticated.
   *
   * @remarks
   * This function is called on the redirect page after a user has been authenticated
   * via the Stytch B2B login flow. It uses the `stytchTokenType` and `token` query
   * params to authenticate the user with Stytch and log them in.
   *
   * If the user is a loan applicant, it redirects them to the loan application
   * page. Otherwise, it redirects them to the dashboard.
   *
   * @see {@link https://stytch.com/docs/api/b2b/oauth#flow}
   */
  const handleOAuthCallback = useCallback(
    (token: string) => {
      try {
        loginBySocialMutate({ provider: SocialProvider.GOOGLE, token })
      } catch (e) {
        toastError({
          ...TOAST_MSG.user.stytchOAuth,
          description: "Failed to authenticate OAuth or it was expired"
        })
      }
    },
    [loginBySocialMutate]
  )

  const handleMagicLinkCallback = useCallback(
    async (token: string) => {
      try {
        await loginByMagicLink(token)
      } catch (e) {
        toastError({
          ...TOAST_MSG.user.stytchMagicLink,
          description: "Failed to authenticate magic link or it was expired"
        })
      }
    },
    [loginByMagicLink]
  )

  const handleStytchCallback = useCallback(async () => {
    const stytchTokenType = getTokenType()
    const token = searchParams.get(RedirectParam.TOKEN)
    if (stytchTokenType && token) {
      switch (stytchTokenType) {
        case RedirectParam.OAUTH:
          handleOAuthCallback(token)
          break
        case RedirectParam.MAGIC_LINKS:
          handleMagicLinkCallback(token)
          break
      }
    }
    if (searchParams.has(RedirectParam.EMAIL)) {
      setEmail(searchParams.get(RedirectParam.EMAIL) ?? "")
    }
  }, [getTokenType, searchParams, handleOAuthCallback, handleMagicLinkCallback])

  useEffect(() => {
    // Only run once when the component mounts
    if (!initialized.current) {
      initialized.current = true
      handleStytchCallback()
    }
  }, [handleStytchCallback])

  return (
    <div className="rounded-[32px] shadow-primary md:w-[540px] mx-auto h-auto p-8 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="flex justify-center relative">
            <div className="w-[56px] self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full border flex justify-center items-center rounded-xl">
                  <KeySquare size={28} />
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
                Authenticating...
              </h1>

              <div className="text-muted-foreground mt-3">
                <p>
                  You will be redirected to
                  {getTokenType() === RedirectParam.OAUTH
                    ? " phone verification page "
                    : " your home page "}
                  once your account is verified.
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
    </div>
  )
}
