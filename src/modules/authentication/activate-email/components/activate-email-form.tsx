import { useActivateEmail } from "../hooks/useActivateEmail"
import { ActiveEmailFooter } from "./activate-email-footer"
import { ActivateEmailFormHeader } from "./activate-email-form-header"

export function ActivateEmailForm() {
  const { isPending, isSuccess, errorCode } = useActivateEmail()

  return (
    <>
      <ActivateEmailFormHeader
        errorCode={errorCode}
        isPending={isPending}
        isSuccess={isSuccess}
      />

      <ActiveEmailFooter
        errorCode={errorCode}
        isPending={isPending}
        isSuccess={isSuccess}
      />
    </>
  )
}
