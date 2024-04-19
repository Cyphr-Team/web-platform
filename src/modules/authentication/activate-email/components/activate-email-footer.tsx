import { ErrorCode } from "@/utils/custom-error"
import { useMemo } from "react"
import { UserStartStatus } from "../../hooks/useGetStart"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"
import { BackToLoginButton } from "./BackToLoginButton"
import { BackToSignUpPageButton } from "./BackToSignUpPageButton"
import { GetNewEmailVerificationLinkByEmailButton } from "./GetNewEmailVerificationLinkByEmailButton"

interface ActiveEmailFooterProps {
  isPending: boolean
  isSuccess: boolean
  errorCode: ErrorCode
}

export const ActiveEmailFooter = ({
  errorCode,
  isPending,
  isSuccess
}: ActiveEmailFooterProps) => {
  const { status } = useActiveEmailSearchParams()

  const footer = useMemo(() => {
    if (isPending || isSuccess) {
      return ""
    }

    if (
      status === UserStartStatus.USER_WAITING_SETUP_PROFILE ||
      status === UserStartStatus.EMAIL_REGISTERED
    )
      return <BackToLoginButton />
    if (status === UserStartStatus.ALREADY_VERIFIED)
      return (
        <GetNewEmailVerificationLinkByEmailButton buttonContent="Continue Sign Up" />
      )

    switch (errorCode) {
      case ErrorCode.token_invalid:
        return <BackToSignUpPageButton />
      case ErrorCode.token_invalid_or_expired:
        return <GetNewEmailVerificationLinkByEmailButton />
      case ErrorCode.user_registered:
        return (
          <GetNewEmailVerificationLinkByEmailButton buttonContent="Continue Sign Up" />
        )
    }

    return <BackToLoginButton />
  }, [isPending, isSuccess, errorCode, status])

  return footer
}
