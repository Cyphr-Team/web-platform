import { Button, ButtonLoading } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { InputPassword } from "@/components/ui/input"
import { useForm, useFormContext } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import {
  type SetupPasswordFormValue,
  setupPasswordFormSchema,
  useSetupPassword
} from "../hooks/useSetupPassword"
import { SetupPasswordFormHeader } from "./setup-password-form-header"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { PasswordMatch } from "../../components/password-match"

function ResetPasswordForm() {
  const { handleSubmit, control, setValue } =
    useFormContext<SetupPasswordFormValue>()
  const { isPending, mutate, error } = useSetupPassword()

  const errorMsg = error?.response?.data.message
  const errorCode = error?.response?.data.code
  const isInvalidToken = errorCode === ErrorCode.token_invalid_or_expired

  return (
    <form
      className="w-full space-y-5"
      onSubmit={handleSubmit((data) =>
        mutate(data, {
          onSuccess() {
            setValue("successMsg", "Redirect message")
          }
        })
      )}
    >
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <InputPassword
                autoComplete="new-password"
                className="text-base"
                placeholder="••••••••"
                {...field}
                disabled={isPending}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <InputPassword
                autoComplete="new-password"
                className="text-base"
                placeholder="••••••••"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!isInvalidToken && (
        <div className="flex flex-col space-y-1.5">
          <PasswordMatch />
        </div>
      )}

      {Boolean(errorMsg) && (
        <div>
          <ErrorMessage className="whitespace-pre-wrap">
            {`${errorMsg}. ${getCustomErrorMsgByCode(errorCode!)}`}
          </ErrorMessage>
        </div>
      )}

      {isInvalidToken ? (
        <Button
          asChild
          className="ml-auto w-full text-base"
          type="button"
          variant="outline"
        >
          <Link className="flex items-center" to={APP_PATH.FORGOT_PASSWORD}>
            <ArrowLeft className="mr-1 size-5" />
            Back to forgot password
          </Link>
        </Button>
      ) : (
        <ButtonLoading
          className="ml-auto w-full text-base"
          isLoading={isPending}
          type="submit"
        >
          Reset password
        </ButtonLoading>
      )}
    </form>
  )
}

function SuccessReset() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-col items-center space-y-5">
      <Button
        className="ml-auto w-full text-base"
        type="button"
        onClick={() => navigate(APP_PATH.LOGIN)}
      >
        Continue to Login
      </Button>
    </div>
  )
}

export function SetupPasswordForm() {
  const form = useForm<SetupPasswordFormValue>({
    resolver: zodResolver(setupPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all"
  })

  const successMsg = form.watch("successMsg")

  return (
    <>
      <Form {...form}>
        <SetupPasswordFormHeader />
        <div className="flex flex-col space-y-6">
          {successMsg ? <SuccessReset /> : <ResetPasswordForm />}
        </div>
      </Form>

      {!successMsg && (
        <Button
          asChild
          className="self-center px-1 py-0 text-sm text-foreground"
          variant="link"
        >
          <Link to={APP_PATH.LOGIN}>
            <ArrowLeft className="mr-1 size-5" />
            Back to log in
          </Link>
        </Button>
      )}
    </>
  )
}
