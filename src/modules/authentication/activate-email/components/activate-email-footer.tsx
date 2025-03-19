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

  return useMemo(() => {
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
      default:
        return <BackToLoginButton />
      /** Adding these case below for future handler */
      // case ErrorCode.rate_limit_exceeded: {
      //   throw new Error(
      //     "Not implemented yet: ErrorCode.rate_limit_exceeded case"
      //   )
      // }
      // case ErrorCode.institution_subscription_limit_reached: {
      //   throw new Error(
      //     "Not implemented yet: ErrorCode.institution_subscription_limit_reached case"
      //   )
      // }
      // case ErrorCode.cash_flow_not_ready: {
      //   throw new Error(
      //     "Not implemented yet: ErrorCode.cash_flow_not_ready case"
      //   )
      // }
      // case ErrorCode.susbscription_not_found: {
      //   throw new Error(
      //     "Not implemented yet: ErrorCode.susbscription_not_found case"
      //   )
      // }
      // case ErrorCode.bank_already_linked: {
      //   throw new Error(
      //     "Not implemented yet: ErrorCode.bank_already_linked case"
      //   )
      // }
      // case ErrorCode.unauthorized: {
      //   throw new Error("Not implemented yet: ErrorCode.unauthorized case")
      // }
    }
  }, [isPending, isSuccess, errorCode, status])
}
