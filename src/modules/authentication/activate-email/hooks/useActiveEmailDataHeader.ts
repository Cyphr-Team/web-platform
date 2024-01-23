import { useMemo } from "react"
import { UI_DATA_ACTIVATE_EMAIL_HEADER } from "../constants"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { useActiveEmailSearchParams } from "./useActiveEmailSearchParams"

export const useActiveEmailDataHeader = ({
  isPending
}: {
  isPending: boolean
}) => {
  const { status } = useActiveEmailSearchParams()

  const dataHeader = useMemo(() => {
    if (isPending) {
      return UI_DATA_ACTIVATE_EMAIL_HEADER.verifying
    }
    switch (status) {
      case UserStartStatus.USER_WAITING_SETUP_PROFILE:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.verified
      case UserStartStatus.EMAIL_REGISTERED:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.signedUp
      default:
        return UI_DATA_ACTIVATE_EMAIL_HEADER.expired
    }
  }, [isPending, status])

  return dataHeader
}
