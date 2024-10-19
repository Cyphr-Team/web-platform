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
import { LoginGoogleButton } from "./login-google-button"
import { APP_PATH } from "@/constants"
import { Checkbox } from "@/components/ui/checkbox"
import {
  type LoginFormValue,
  loginFormSchema,
  useLogin
} from "../hooks/useLogin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useSearchParams } from "react-router-dom"
import { isAdmin } from "@/utils/domain.utils"

export function LoginForm() {
  const [searchParams] = useSearchParams()

  const { isPending, mutate, error } = useLogin()
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
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit((data) => mutate(data))}
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
                    className="text-base"
                    placeholder="Enter your email"
                    type="email"
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
                    autoComplete="current-password"
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

          <div className="flex justify-between space-x-4">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      disabled={isPending}
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
                asChild
                className="p-0 text-primary"
                type="button"
                variant="link"
              >
                <Link to={APP_PATH.FORGOT_PASSWORD}>Forgot password</Link>
              </Button>
            </p>
          </div>

          {Boolean(errorMsg) && <ErrorMessage>{errorMsg}</ErrorMessage>}

          <ButtonLoading
            className="ml-auto w-full text-base"
            disabled={!form.formState.isValid}
            isLoading={isPending}
            type="submit"
          >
            Sign in
          </ButtonLoading>
        </form>
      </Form>
      {!isAdmin() ? <LoginGoogleButton /> : null}
    </div>
  )
}
