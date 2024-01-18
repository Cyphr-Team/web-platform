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
import { ActivateEmailFormHeader } from "./activate-email-form-header"
import {
  ResendActivateEmailFormValue,
  resendActivateEmailFormSchema,
  useResendActivateEmail
} from "../hooks/useResendActivateEmail"
import { isAxiosError } from "axios"
import { useActivateEmail } from "../hooks/useActivateEmail"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"

/**
 * Enter an email to get reset password email
 */
function ResendActivateEmailForm() {
  const { isPending, mutate } = useResendActivateEmail()
  const navigate = useNavigate()

  const { handleSubmit, control, setError } =
    useFormContext<ResendActivateEmailFormValue>()

  const formSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => navigate(APP_PATH.VERIFY_EMAIL.detail(data.email)),
      onError: (error) =>
        setError("email", {
          type: "server",
          message: isAxiosError(error) ? error.response?.data.message : error
        })
    })
  })

  return (
    <form onSubmit={formSubmit} className="space-y-6 w-full">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your email"
                disabled={isPending}
                className="text-base"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
  const form = useForm<ResendActivateEmailFormValue>({
    resolver: zodResolver(resendActivateEmailFormSchema),
    defaultValues: { email: "" },
    mode: "onSubmit"
  })

  const { isPending } = useActivateEmail()

  return (
    <Form {...form}>
      <ActivateEmailFormHeader isPending={isPending} />
      <div className="flex flex-col space-y-6">
        {!isPending && <ResendActivateEmailForm />}
      </div>
    </Form>
  )
}
