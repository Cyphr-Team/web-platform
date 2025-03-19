import { ArrowLeft, KeySquare } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useRef, useState } from "react"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { RedirectParam } from "../constants/params"
import { SocialProvider } from "@/types/auth.type.ts"
import { useLoginWithSocialMFA } from "@/hooks/login-with-social/useLoginWithSocialMFA.ts"
import { useAuthenticateWithMagicLink } from "@/modules/authentication/magic-link/hooks/useAuthenticateWithMagicLink"
import { isLaunchKC } from "@/utils/domain.utils"
import { inMemoryJWTService } from "@/services/jwt.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"

export function RedirectSection() {
  const { mutate: loginBySocialMutate } = useLoginWithSocialMFA()
  const { mutate: loginByMagicLinkMutate } = useAuthenticateWithMagicLink()
  const [email, setEmail] = useState("")
  const [searchParams] = useSearchParams()
  const initialized = useRef(false)
  const navigate = useNavigate()

  const getTokenType = useCallback((): RedirectParam | null => {
    const value = searchParams.get(RedirectParam.STYTCH_TOKEN_TYPE)

    if (!value) return null

    return value as RedirectParam
  }, [searchParams])

  const loginByMagicLink = useCallback(
    (token: string) => {
      try {
        loginByMagicLinkMutate({
          magicLinkToken: token
        })
      } catch (e) {
        toastError({
          ...TOAST_MSG.user.stytchMagicLink,
          description: "Failed to authenticate Magic Link or it was expired"
        })
      }
    },
    [loginByMagicLinkMutate]
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
        loginByMagicLink(token)
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

    // If user is already in a session, we wont need to authenticate the user again.
    if (inMemoryJWTService.getToken() != null) {
      if (checkIsLoanApplicant()) {
        navigate(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list)
      } else {
        navigate(APP_PATH.INDEX)
      }

      return
    }
    if (stytchTokenType && token) {
      switch (stytchTokenType) {
        case RedirectParam.OAUTH:
          handleOAuthCallback(token)
          break
        case RedirectParam.MAGIC_LINKS:
          handleMagicLinkCallback(token)
          break
        case RedirectParam.STYTCH_TOKEN_TYPE: {
          throw new Error(
            "Not implemented yet: RedirectParam.STYTCH_TOKEN_TYPE case"
          )
        }
        case RedirectParam.TOKEN: {
          throw new Error("Not implemented yet: RedirectParam.TOKEN case")
        }
        case RedirectParam.EMAIL: {
          throw new Error("Not implemented yet: RedirectParam.EMAIL case")
        }
      }
    }
    if (searchParams.has(RedirectParam.EMAIL)) {
      setEmail(searchParams.get(RedirectParam.EMAIL) ?? "")
    }
  }, [
    getTokenType,
    searchParams,
    navigate,
    handleOAuthCallback,
    handleMagicLinkCallback
  ])

  useEffect(() => {
    // Only run once when the component mounts
    if (!initialized.current) {
      initialized.current = true
      handleStytchCallback()
    }
  }, [handleStytchCallback])

  return (
    <div className="mx-auto h-auto rounded-[32px] bg-white p-8 shadow-primary md:w-[540px]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center">
          <div className="relative flex justify-center">
            <div className="w-[56px] self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="flex size-full items-center justify-center rounded-xl border">
                  <KeySquare size={28} />
                </div>
              </AspectRatio>
            </div>
          </div>
          {email ? (
            <>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                Check your email
              </h1>

              <div className="mt-3 text-muted-foreground">
                <p>We sent a verification link to</p>
                <p className="font-medium">{email}</p>
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                Authenticating...
              </h1>

              <div className="mt-3 text-muted-foreground">
                <p>
                  You will be redirected to
                  {getTokenType() === RedirectParam.OAUTH && !isLaunchKC()
                    ? " phone verification page "
                    : " your home page "}
                  once your account is verified.
                </p>
              </div>
            </>
          )}
        </div>

        <Button
          asChild
          className="self-center px-1 py-0 text-sm text-foreground"
          variant="link"
        >
          <Link to={APP_PATH.LOGIN}>
            <ArrowLeft className="mr-1 size-5" />
            Back to log in
          </Link>
        </Button>
      </div>
    </div>
  )
}
