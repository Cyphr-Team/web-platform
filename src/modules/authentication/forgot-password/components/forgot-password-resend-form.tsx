import { ButtonLoading } from "@/components/ui/button"
import { useFormContext } from "react-hook-form"
import { type ForgotPasswordFormValue } from "../hooks/useForgotPassword"
import { useResend } from "../hooks/useResend"
import { isAxiosError } from "axios"
import { AppAlert } from "@/components/ui/alert"
import { useMemo } from "react"
import {
  ErrorCode,
  getAxiosError,
  getCustomErrorMsgByCode
} from "@/utils/custom-error"

/**
 * Notification about successful sending forgot password email
 * Resend forgot password email
 */
export function ResendForm() {
  const { isPending, isSuccess, mutate, error } = useResend()
  const errorMsg = getAxiosError(error).message

  const { watch } = useFormContext<ForgotPasswordFormValue>()

  const successSentEmail = watch("successSentEmail")

  const dataAlert = useMemo(() => {
    const axiosError = getAxiosError(error)
    const customLimitError =
      axiosError.code === ErrorCode.rate_limit_exceeded
        ? getCustomErrorMsgByCode(ErrorCode.rate_limit_exceeded)
        : ""

    return errorMsg
      ? {
          variant: "error" as const,
          title:
            !isAxiosError(error) || customLimitError
              ? "Too many attempts"
              : "Something went wrong",
          description: customLimitError || errorMsg
        }
      : {
          variant: "success" as const,
          title: "Resend successfully",
          description:
            "We've sent you a new email, please check your email again."
        }
  }, [error, errorMsg])

  const conditionAlert = (isSuccess || errorMsg) && (
    <AppAlert
      description={dataAlert.description}
      title={dataAlert.title}
      variant={dataAlert.variant}
    />
  )

  return (
    <div className="flex w-full flex-col items-center space-y-2">
      {conditionAlert}

      <div>
        <p className="mr-1 inline text-center text-sm text-muted-foreground">
          Didn’t receive the email?
        </p>

        <ButtonLoading
          className="h-7 p-1 text-primary"
          isLoading={isPending}
          type="button"
          variant="ghost"
          onClick={() => mutate({ email: successSentEmail! })}
        >
          Click to resend
        </ButtonLoading>
      </div>
    </div>
  )
}
