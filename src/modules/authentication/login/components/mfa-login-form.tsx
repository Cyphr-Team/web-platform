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
import { Input, InputPassword } from "@/components/ui/input"
import { APP_PATH } from "@/constants"
import { Checkbox } from "@/components/ui/checkbox"
import { LoginFormValue, loginFormSchema } from "../hooks/useLogin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useSearchParams } from "react-router-dom"
import { useStytchLogin } from "../hooks/useStytchLogin"
import { LoginGoogleButtonMFA } from "./mfa-login-google-button"

export function MfaLoginForm() {
  const [searchParams] = useSearchParams()

  const { isPending, mutate, error } = useStytchLogin()
  const errorMsg = error?.response?.data.message

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: ""
    }
  })

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <Input
                    type="email"
                    placeholder="Enter address (required)"
                    className="text-base"
                    autoComplete="username"
                    {...field}
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
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <InputPassword
                    placeholder="Enter password (required)"
                    className="text-base"
                    autoComplete="current-password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between space-x-4">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Remember for 30 days
                  </FormLabel>
                </FormItem>
              )}
            />

            <p className="text-sm">
              <Button
                type="button"
                variant="link"
                className="p-0 text-primary"
                asChild
              >
                <Link to={APP_PATH.FORGOT_PASSWORD}>Forgot password</Link>
              </Button>
            </p>
          </div>

          {Boolean(errorMsg) && <ErrorMessage>{errorMsg}</ErrorMessage>}

          <ButtonLoading
            disabled={!form.formState.isValid}
            isLoading={isPending}
            className="ml-auto w-full text-base"
            type="submit"
          >
            Sign in
          </ButtonLoading>
        </form>
      </Form>

      <LoginGoogleButtonMFA />
    </div>
  )
}
