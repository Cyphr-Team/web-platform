import { Button, ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { ActivateEmailFormHeader } from "./activate-email-form-header"
import {
  ResendActivateEmailFormValue,
  resendActivateEmailFormSchema,
  useResendActivateEmail
} from "../hooks/useResendActivateEmail"
import { useActivateEmail } from "../hooks/useActivateEmail"
import { Link, createSearchParams, useSearchParams } from "react-router-dom"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"
import { UserStartStatus } from "../../sign-up/hooks/useGetStart"
import { APP_PATH } from "@/constants"
import { ArrowLeft } from "lucide-react"
import { getAxiosError } from "@/utils/custom-error"

/**
 * Enter an email to get reset password email
 */
function ResendActivateEmailForm() {
  const [searchParams] = useSearchParams()
  const { isPending, mutate } = useResendActivateEmail()

  const { handleSubmit, setError } =
    useFormContext<ResendActivateEmailFormValue>()

  const formSubmit = handleSubmit(() => {
    mutate(
      { token: searchParams.get("token") ?? "" },
      {
        onError: (error) =>
          setError("email", {
            type: "server",
            message: getAxiosError(error)?.message
          })
      }
    )
  })

  return (
    <form onSubmit={formSubmit} className="space-y-6 w-full">
      <div className="flex flex-col space-y-2">
        <ButtonLoading
          isLoading={isPending}
          className="ml-auto w-full text-base"
          type="submit"
        >
          Get new email verification link
        </ButtonLoading>
      </div>
    </form>
  )
}

export function ActivateEmailForm() {
  const { status, email } = useActiveEmailSearchParams()

  const form = useForm<ResendActivateEmailFormValue>({
    resolver: zodResolver(resendActivateEmailFormSchema),
    mode: "onSubmit"
  })

  const { isPending, isSuccess, errorCode } = useActivateEmail()

  const isWaitingSetupProfile =
    status === UserStartStatus.USER_WAITING_SETUP_PROFILE

  return (
    <>
      <Form {...form}>
        <ActivateEmailFormHeader
          isPending={isPending}
          isSuccess={isSuccess}
          errorCode={errorCode}
        />
        <div className="flex flex-col space-y-6">
          {!isPending && !status && !errorCode && <ResendActivateEmailForm />}
        </div>
      </Form>

      {isWaitingSetupProfile || errorCode ? (
        <p className="px-8 text-center text-sm text-muted-foreground">
          Request a new instruction?{" "}
          <Button
            variant="link"
            className="px-1 text-sm text-foreground py-0 self-center"
            asChild
          >
            <Link
              to={{
                pathname: APP_PATH.SIGN_UP,
                search: createSearchParams({ email }).toString()
              }}
            >
              Back to sign up
            </Link>
          </Button>
        </p>
      ) : (
        <Button
          variant="link"
          className="px-1 text-sm text-foreground py-0 self-center"
          asChild
        >
          <Link
            to={{
              pathname: APP_PATH.LOGIN,
              search: createSearchParams({ email }).toString()
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to log in
          </Link>
        </Button>
      )}
    </>
  )
}
