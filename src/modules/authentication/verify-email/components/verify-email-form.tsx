import { ButtonLoading } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"

import { VerifyEmailCodeInput } from "./verify-email-input-code"
import { useVerifyEmail } from "../hooks/useVerifyEmail"
import { useActivateByCode } from "../hooks/useActivateByCode"
import { isAxiosError } from "axios"
import { useResendActivate } from "../hooks/useResendActivate"
import { useMemo } from "react"
import { AppAlert } from "@/components/ui/alert"

export function VerifyEmailForm() {
  const { form, inputRefs, handleInputCode, handlePasteCode } = useVerifyEmail()
  const { mutate, isPending } = useActivateByCode()
  const {
    mutate: resendMutate,
    isPending: resendIsPending,
    error: resendError,
    isSuccess: resendIsSuccess
  } = useResendActivate()

  // Activate
  const formSubmit = form.handleSubmit((data) =>
    mutate(data, {
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
    })
  )

  // Resend Error
  const errorMsg = isAxiosError(resendError)
    ? resendError.response?.data.message ?? resendError.message
    : resendError

  const dataAlert = useMemo(() => {
    return errorMsg
      ? {
          variant: "error" as const,
          title: isAxiosError(resendError)
            ? "Something went wrong"
            : "Check your email",
          description: errorMsg
        }
      : {
          variant: "success" as const,
          title: "Resend successfully",
          description:
            "We've sent you a new email, please check your email again."
        }
  }, [resendError, errorMsg])

  const conditionAlert =
    resendIsSuccess || errorMsg ? (
      <AppAlert
        variant={dataAlert.variant}
        title={dataAlert.title}
        description={dataAlert.description}
      />
    ) : (
      ""
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
                        <VerifyEmailCodeInput
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
              variant="outline"
              isLoading={isPending}
              className="ml-auto w-full text-base"
              type="submit"
            >
              Verify email
            </ButtonLoading>
          </div>

          <div className="flex flex-col space-y-2">
            {conditionAlert}

            <div className="text-center">
              <p className="text-center text-sm text-muted-foreground inline mr-1">
                Didn’t receive the email?
              </p>

              <ButtonLoading
                isLoading={resendIsPending}
                type="button"
                variant="ghost"
                className="p-1 h-7 text-primary"
                onClick={() => {
                  resendMutate()
                }}
              >
                Click to resend
              </ButtonLoading>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
