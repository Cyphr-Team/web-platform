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
import { useLocation, useSearchParams } from "react-router-dom"
import { getAxiosError } from "@/utils/custom-error"
import { useVerifyPhone } from "../hooks/useVerifyPhone"
import { VerifyPhoneCodeInput } from "./verify-phone-input-code"

export function VerifyPhoneForm() {
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") ?? ""

  const { form, inputRefs, handleInputCode, handlePasteCode } = useVerifyPhone()
  const { mutate, isPending } = useActivateByCode(state)
  const {
    mutate: resendMutate,
    isPending: resendIsPending,
    error: resendError,
    isSuccess: resendIsSuccess
  } = useResendActivate(state)

  // Activate
  const formSubmit = form.handleSubmit((data) =>
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
        }
      }
    )
  )

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
      variant={dataAlert.variant}
      title={dataAlert.title}
      description={dataAlert.description}
    />
  )

  return (
    <div className="flex flex-col space-y-6">
      <Form {...form}>
        <form
          onSubmit={formSubmit}
          className="space-y-4 sm:space-y-8 w-full flex flex-col items-center"
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
                          maxLength={1}
                          type="string"
                          placeholder="0"
                          className="input-number-remove-arrow"
                          {...field}
                          disabled={isPending}
                          onKeyDown={handleInputCode(index)}
                          onChange={() => null}
                          onPaste={handlePasteCode}
                          autoFocus={index === 0}
                          ref={(e) => {
                            field.ref(e)
                            inputRefs.current[index] = e
                          }}
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
              variant="default"
              isLoading={isPending}
              disabled={!form.formState.isValid}
              className="ml-auto w-full text-base"
              type="submit"
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
                isLoading={resendIsPending}
                type="button"
                variant="ghost"
                className="p-1 h-7 text-primary"
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
