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
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom"
import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { APP_PATH } from "@/constants"
import { UserStartStatus } from "../../hooks/useGetStart"

export function VerifyEmailForm() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") ?? ""

  const { email } = useParams()
  const navigate = useNavigate()

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
    mutate(
      { ...data, token },
      {
        onError(errorResponse) {
          if (
            !!email &&
            isAxiosError(errorResponse) &&
            errorResponse.response?.data?.code === ErrorCode.user_registered
          ) {
            navigate({
              pathname: APP_PATH.VERIFY_EMAIL.activateByToken,
              search: createSearchParams({
                email: email,
                status: UserStartStatus.ALREADY_VERIFIED
              }).toString()
            })

            return
          }

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
          className="flex w-full flex-col items-center space-y-4 sm:space-y-8"
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
                        <VerifyEmailCodeInput
                          className="input-number-remove-arrow"
                          maxLength={1}
                          placeholder="0"
                          type="string"
                          {...field}
                          ref={(e) => {
                            field.ref(e)
                            inputRefs.current[index] = e
                          }}
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

          <div className="flex w-full flex-col space-y-2">
            <ErrorMessage>
              {form.formState.errors.root?.serverError?.message}
            </ErrorMessage>

            <ButtonLoading
              className="ml-auto w-full text-base"
              isLoading={isPending}
              type="submit"
              variant={form.formState.isDirty ? "default" : "outline"}
            >
              Verify email
            </ButtonLoading>
          </div>

          <div className="flex flex-col space-y-2">
            {conditionAlert}

            <div className="text-center">
              <p className="mr-1 inline text-center text-sm text-muted-foreground">
                Didn’t receive the email?
              </p>

              <ButtonLoading
                className="h-7 p-1 text-primary"
                isLoading={resendIsPending}
                type="button"
                variant="ghost"
                onClick={() => {
                  resendMutate({ token })
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
