import { ErrorCode } from "@/utils/custom-error"
import { useMemo } from "react"
import { UserStartStatus } from "../../hooks/useGetStart"
import { UI_DATA_ACTIVATE_EMAIL_HEADER } from "../constants"
import { useActiveEmailSearchParams } from "./useActiveEmailSearchParams"

export const useActiveEmailDataHeader = ({
  isPending,
  isSuccess,
  errorCode
}: {
  isPending: boolean
  isSuccess: boolean
  errorCode: ErrorCode
}) => {
  const { status, email } = useActiveEmailSearchParams()

  const dataHeader = useMemo(() => {
    if (isPending) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.verifying
    }
    if (isSuccess) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.success
    }
    if (errorCode === ErrorCode.token_invalid) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.invalid
    }

    switch (status) {
      case UserStartStatus.USER_WAITING_SETUP_PROFILE:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.successSendingSetupProfileEmail
      case UserStartStatus.EMAIL_REGISTERED:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.signedUp(email)
      case UserStartStatus.ALREADY_VERIFIED:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.verified(email)
    }

    if (errorCode === ErrorCode.user_registered) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.verified(email)
    }
    if (errorCode === ErrorCode.token_invalid_or_expired) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.expired
    }

    return UI_DATA_ACTIVATE_EMAIL_HEADER.invalid
  }, [isPending, isSuccess, errorCode, status, email])

  return dataHeader
}
