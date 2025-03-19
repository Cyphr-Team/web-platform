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
  type AcceptInviteFormValue,
  acceptInviteFormSchema,
  useAcceptInvite
} from "../hooks/useAcceptInvite"
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
import { APP_PATH } from "@/constants"
import { AppAlert } from "@/components/ui/alert"
import { PasswordMatch } from "../../components/password-match"
import { isEnableMFA, parseJwt } from "@/services/jwt.service"
import { useLogout } from "@/hooks/useLogout"
import { useStytchLogin } from "../../login/hooks/useStytchLogin"

export function SetupProfileForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearUserInfo } = useLogout()

  const form = useForm<AcceptInviteFormValue>({
    resolver: zodResolver(acceptInviteFormSchema),
    defaultValues: {
      name: "",
      email:
        searchParams.get("email") ??
        parseJwt(searchParams.get("token")!)?.email ??
        "",
      token: searchParams.get("token") ?? "",
      password: "",
      confirmPassword: ""
    },
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all"
  })

  const handleSubmit = form.handleSubmit((data) =>
    mutate(data, {
      onSuccess() {
        clearUserInfo()
      },
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

  const { mutate, isPending, isSuccess } = useAcceptInvite()

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
            email:
              searchParams.get("email") ??
              parseJwt(searchParams.get("token")!)?.email ??
              ""
          }).toString()
        })
      }
    }
  }, [searchParams, count, navigate, form, mutateLogin])

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          {!!form.getValues("email") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="disabled:opacity-1 text-base font-medium disabled:bg-muted"
                      placeholder="Enter your email"
                      {...field}
                      disabled
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    className="text-base"
                    placeholder="Create a password"
                    {...field}
                    autoComplete="new-password"
                    disabled={isPending}
                  />
                </FormControl>
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
              className="mt-5 w-full text-base"
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
