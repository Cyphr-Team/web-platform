import { useMemo } from "react"
import { UI_DATA_ACTIVATE_EMAIL_HEADER } from "../constants"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { useActiveEmailSearchParams } from "./useActiveEmailSearchParams"
import { ErrorCode } from "@/utils/custom-error"

export const useActiveEmailDataHeader = ({
  isPending,
  isSuccess,
  errorCode
}: {
  isPending: boolean
  isSuccess: boolean
  errorCode: ErrorCode
}) => {
  const { status } = useActiveEmailSearchParams()

  const dataHeader = useMemo(() => {
    if (isPending) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.verifying
    }
    if (isSuccess) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.success
    }
    if (errorCode === ErrorCode.user_registered) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.registered
    }

    switch (status) {
      case UserStartStatus.USER_WAITING_SETUP_PROFILE:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.verified
      case UserStartStatus.EMAIL_REGISTERED:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.signedUp
      default:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.expired
    }
  }, [isSuccess, isPending, status, errorCode])

  return dataHeader
}
