import { ButtonLoading } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import {
  type ForgotPasswordFormValue,
  forgotPasswordFormSchema,
  useForgotPassword
} from "../hooks/useForgotPassword"
import { ForgotPasswordFormHeader } from "./forgot-password-form-header"
import { ResendForm } from "./forgot-password-resend-form"
import {
  ErrorCode,
  getAxiosError,
  getCustomErrorMsgByCode
} from "@/utils/custom-error"
import { AppAlert } from "@/components/ui/alert"

/**
 * Enter an email to get reset password email
 */
function ResetPasswordForm() {
  const { isPending, mutate, error } = useForgotPassword()

  const { handleSubmit, control, setValue, setError } =
    useFormContext<ForgotPasswordFormValue>()

  const formSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => setValue("successSentEmail", data.email),
      onError: (error) => {
        const axiosError = getAxiosError(error)

        if (axiosError.code !== ErrorCode.rate_limit_exceeded) {
          setError("email", {
            type: "server",
            message: axiosError.message
          })
        }
      }
    })
  })

  const isLimitError =
    getAxiosError(error).code === ErrorCode.rate_limit_exceeded

  const conditionAlert = isLimitError && (
    <AppAlert
      description={getCustomErrorMsgByCode(ErrorCode.rate_limit_exceeded)}
      title="Too many attempts"
      variant="error"
    />
  )

  return (
    <form className="w-full space-y-6" onSubmit={formSubmit}>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                className="text-base"
                disabled={isPending}
                placeholder="Enter your email"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col space-y-2">
        {conditionAlert}

        <ButtonLoading
          className="ml-auto w-full text-base"
          isLoading={isPending}
          type="submit"
        >
          Reset password
        </ButtonLoading>
      </div>
    </form>
  )
}

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
    mode: "onSubmit"
  })

  const successSentEmail = form.watch("successSentEmail")

  return (
    <Form {...form}>
      <ForgotPasswordFormHeader />
      <div className="flex flex-col space-y-6">
        {successSentEmail ? <ResendForm /> : <ResetPasswordForm />}
      </div>
    </Form>
  )
}
