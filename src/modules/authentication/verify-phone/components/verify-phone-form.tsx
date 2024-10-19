import { ButtonLoading } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"

import { useActivateByCode } from "../hooks/useActivateByCode"
import { isAxiosError } from "axios"
import { useResendActivate } from "../hooks/useResendActivate"
import { useMemo } from "react"
import { AppAlert } from "@/components/ui/alert"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { useVerifyPhone } from "../hooks/useVerifyPhone"
import { VerifyPhoneCodeInput } from "./verify-phone-input-code"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import { APP_PATH } from "@/constants"
import { INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY } from "@/services/jwt.service"

export function VerifyPhoneForm() {
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const navigate = useNavigate()

  const { form, inputRefs, handleInputCode, handlePasteCode } = useVerifyPhone()
  const { mutate, isPending } = useActivateByCode(state)
  const {
    mutate: resendMutate,
    isPending: resendIsPending,
    error: resendError,
    isSuccess: resendIsSuccess
  } = useResendActivate(state)

  // Activate
  const formSubmit = form.handleSubmit((data) => {
    // Check if intermediate session token is available
    // If not, redirect to login page
    if (localStorage.getItem(INTERMEDIATE_SESSION_TOKEN_TEMP_LS_KEY) == null) {
      toastError({
        ...TOAST_MSG.user.stytchOTP,
        description: "Something went wrong. Please login again."
      })
      navigate(APP_PATH.LOGIN)
    }
    mutate(
      { ...data },
      {
        onError(errorResponse) {
          form.setError("root.serverError", {
            type: "server",
            message: isAxiosError(errorResponse)
              ? errorResponse.response?.data.message ??
                errorResponse?.message ??
                ""
              : errorResponse
          })

          // Check if user is unauthorized
          // If yes, redirect to login page
          if (
            isAxiosError(errorResponse) &&
            errorResponse.response?.data?.code &&
            errorResponse.response?.data?.code === ErrorCode.unauthorized
          ) {
            toastError({
              ...TOAST_MSG.user.stytchOTP,
              description:
                errorResponse.response?.data.message ??
                "Something went wrong. Please login again."
            })
            navigate(APP_PATH.LOGIN)
          }
        }
      }
    )
  })

  // Resend Error
  const errorMsg = getAxiosError(resendError).message

  const dataAlert = useMemo(() => {
    return errorMsg
      ? {
          variant: "error" as const,
          title: isAxiosError(resendError)
            ? "Something went wrong"
            : "Check your phone",
          description: errorMsg
        }
      : {
          variant: "success" as const,
          title: "Resend successfully",
          description:
            "We've sent you a new OTP, please check your phone again."
        }
  }, [resendError, errorMsg])

  const conditionAlert = (resendIsSuccess || errorMsg) && (
    <AppAlert
      description={dataAlert.description}
      title={dataAlert.title}
      variant={dataAlert.variant}
    />
  )

  return (
    <div className="flex flex-col space-y-6">
      <Form {...form}>
        <form
          className="space-y-4 sm:space-y-8 w-full flex flex-col items-center"
          onSubmit={formSubmit}
        >
          <div className="flex space-x-3">
            {inputRefs.current.map((_, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={`codes.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <VerifyPhoneCodeInput
                          className="input-number-remove-arrow"
                          maxLength={1}
                          placeholder="0"
                          type="string"
                          {...field}
                          ref={(e) => {
                            field.ref(e)
                            inputRefs.current[index] = e
                          }}
                          autoFocus={index === 0}
                          disabled={isPending}
                          onChange={() => null}
                          onKeyDown={handleInputCode(index)}
                          onPaste={handlePasteCode}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            })}
          </div>

          <div className="w-full flex flex-col space-y-2">
            <ErrorMessage>
              {form.formState.errors.root?.serverError?.message}
            </ErrorMessage>

            <ButtonLoading
              className="ml-auto w-full text-base"
              disabled={!form.formState.isValid}
              isLoading={isPending}
              type="submit"
              variant="default"
            >
              Verify
            </ButtonLoading>
          </div>

          <div className="flex flex-col space-y-2">
            {conditionAlert}

            <div className="text-center">
              <p className="text-center text-sm text-muted-foreground inline mr-1">
                Didn’t receive the code?
              </p>

              <ButtonLoading
                className="p-1 h-7 text-primary"
                isLoading={resendIsPending}
                type="button"
                variant="ghost"
                onClick={() => {
                  resendMutate({ token })
                }}
              >
                Resend code
              </ButtonLoading>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
