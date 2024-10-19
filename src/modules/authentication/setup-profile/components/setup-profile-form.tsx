import { ButtonLoading } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input, InputPassword } from "@/components/ui/input"
import {
  type SetupProfileFormValue,
  setupProfileFormSchema,
  useSetupProfile
} from "../hooks/useSetupProfile"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createSearchParams,
  useNavigate,
  useSearchParams
} from "react-router-dom"
import { isAxiosError } from "axios"
import { useCountdown } from "@/hooks/useCountdown"
import { useEffect } from "react"
import { APP_PATH, type PasswordRegex } from "@/constants"
import { AppAlert } from "@/components/ui/alert"
import { PasswordMatch } from "../../components/password-match"
import { PASSWORD_REGEX_TEXT } from "../../hooks/usePasswordMatch"
import { useStytchLogin } from "../../login/hooks/useStytchLogin"
import { isEnableMFA } from "@/services/jwt.service"

export function SetupProfileForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const form = useForm<SetupProfileFormValue>({
    resolver: zodResolver(setupProfileFormSchema),
    defaultValues: {
      name: "",
      email: searchParams.get("email") ?? "",
      token: searchParams.get("token") ?? "",
      password: "",
      confirmPassword: ""
    },
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all"
  })

  const { mutate, isPending, isSuccess } = useSetupProfile()

  const { mutate: mutateLogin, error: errorLogin } = useStytchLogin()

  const errorMsg =
    form.formState.errors.root?.serverError?.message ?? errorLogin?.message

  const { count } = useCountdown({
    initialCount: 2,
    isStart: isSuccess
  })

  useEffect(() => {
    if (count < 1) {
      if (isEnableMFA()) {
        const { email, password } = form.getValues()

        mutateLogin({ email, password })
      } else {
        navigate({
          pathname: APP_PATH.LOGIN,
          search: createSearchParams({
            email: searchParams.get("email") ?? ""
          }).toString()
        })
      }
    }
  }, [searchParams, count, navigate, form, mutateLogin])

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          className="space-y-5 w-full"
          onSubmit={form.handleSubmit((data) =>
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
          )}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <Input
                    autoComplete="username"
                    className="text-base font-medium disabled:opacity-1 disabled:bg-muted"
                    placeholder="Enter your email"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <Input
                    className="text-base"
                    placeholder="Enter your name"
                    {...field}
                    autoComplete="name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <InputPassword
                    className="text-base"
                    placeholder="Create a password"
                    {...field}
                    autoComplete="new-password"
                    disabled={isPending}
                  />
                </FormControl>
                {fieldState.error?.message ? (
                  <ErrorMessage>
                    {PASSWORD_REGEX_TEXT[
                      fieldState.error.message as PasswordRegex
                    ] ?? fieldState.error.message}
                  </ErrorMessage>
                ) : null}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <InputPassword
                    className="text-base"
                    placeholder="Confirm your password"
                    {...field}
                    autoComplete="new-password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-3">
            {!isSuccess && (
              <div className="flex flex-col space-y-1.5">
                <PasswordMatch />
              </div>
            )}

            {Boolean(errorMsg) && (
              <ErrorMessage className="whitespace-pre-wrap">
                {`${errorMsg}.`}
              </ErrorMessage>
            )}

            {isSuccess ? (
              <AppAlert
                description={`You'll be redirected to the ${
                  isEnableMFA() ? "MFA setup" : "login"
                } page after ${count} seconds`}
                title="Your sign up has been completed"
                variant="success"
              />
            ) : null}

            <ButtonLoading
              className="w-full text-base mt-5"
              disabled={isSuccess || isPending}
              isLoading={isPending}
              type="submit"
            >
              Get started
            </ButtonLoading>
          </div>
        </form>
      </Form>
    </div>
  )
}
