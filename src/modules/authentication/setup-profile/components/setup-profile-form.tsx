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
  SetupProfileFormValue,
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
import { APP_PATH, PasswordRegex } from "@/constants"
import { AppAlert } from "@/components/ui/alert"
import { PasswordMatch } from "../../components/password-match"
import { PASSWORD_REGEX_TEXT } from "../../hooks/usePasswordMatch"

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

  const errorMsg = form.formState.errors.root?.serverError?.message

  const { mutate, isPending, isSuccess } = useSetupProfile()

  const { count } = useCountdown({
    initialCount: 2,
    isStart: isSuccess
  })

  useEffect(() => {
    if (count < 1) {
      navigate({
        pathname: APP_PATH.LOGIN,
        search: createSearchParams({
          email: searchParams.get("email") ?? ""
        }).toString()
      })
    }
  }, [searchParams, count, navigate])

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
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
          className="space-y-5 w-full"
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
                    placeholder="Enter your email"
                    className="text-base font-medium disabled:opacity-1 disabled:bg-muted"
                    {...field}
                    disabled={true}
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
                    placeholder="Enter your name"
                    className="text-base"
                    {...field}
                    disabled={isPending}
                    autoComplete="name"
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
                    placeholder="Create a password"
                    className="text-base"
                    {...field}
                    disabled={isPending}
                    autoComplete="new-password"
                  />
                </FormControl>
                {fieldState.error?.message && (
                  <ErrorMessage>
                    {PASSWORD_REGEX_TEXT[
                      fieldState.error.message as PasswordRegex
                    ] ?? fieldState.error.message}
                  </ErrorMessage>
                )}
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
                    placeholder="Confirm your password"
                    className="text-base"
                    {...field}
                    disabled={isPending}
                    autoComplete="new-password"
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

            {isSuccess && (
              <AppAlert
                variant="success"
                title="Your sign up has been completed"
                description={`You'll be redirected to the login page after ${count} seconds`}
              />
            )}

            <ButtonLoading
              isLoading={isPending}
              disabled={isSuccess || isPending}
              className="w-full text-base mt-5"
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
