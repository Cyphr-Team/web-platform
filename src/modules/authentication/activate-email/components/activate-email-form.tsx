import { useActivateEmail } from "../hooks/useActivateEmail"
import { ActiveEmailFooter } from "./activate-email-footer"
import { ActivateEmailFormHeader } from "./activate-email-form-header"

export function ActivateEmailForm() {
  const { isPending, isSuccess, errorCode } = useActivateEmail()

  return (
    <>
      <ActivateEmailFormHeader
        isPending={isPending}
        isSuccess={isSuccess}
        errorCode={errorCode}
      />

      <ActiveEmailFooter
        isPending={isPending}
        isSuccess={isSuccess}
        errorCode={errorCode}
      />
    </>
  )
}
