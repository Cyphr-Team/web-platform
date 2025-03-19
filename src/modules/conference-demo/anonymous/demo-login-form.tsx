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
import { APP_PATH } from "@/constants"
import { Checkbox } from "@/components/ui/checkbox"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { isAdmin } from "@/utils/domain.utils"
import { LoginGoogleButton } from "@/modules/authentication/login/components/login-google-button"
import {
  loginFormSchema,
  type LoginFormValue,
  useLogin
} from "@/modules/authentication/login/hooks/useLogin"
import {
  AdminDemoEmails,
  ApplicantDemoEmails,
  DEMO_PASSWORD
} from "@/modules/conference-demo/anonymous/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError } from "@/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"

const demoRoleByEmailOptions = () => {
  return [
    {
      label: "Admin - admin@cyphrai.com",
      value: "admin@cyphrai.com"
    },
    {
      label: "Applicant - applicant@cyphrai.com",
      value: "applicant@cyphrai.com"
    }
  ]
}

export function DemoLoginForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { eraseData } = useFormData.use.action()
  const { reset: resetProgress } = useProgress.use.action()

  const { isPending, mutate, error } = useLogin()
  const errorMsg = error?.response?.data.message

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: DEMO_PASSWORD
    }
  })

  const handleDemoAuth = (email: string) => {
    if (AdminDemoEmails.includes(email)) {
      navigate(APP_PATH.CONFERENCE_DEMO.admin.index, { replace: true })
    } else if (ApplicantDemoEmails.includes(email)) {
      eraseData()
      resetProgress()
      navigate(APP_PATH.CONFERENCE_DEMO.applicant.index, { replace: true })
    } else {
      toastError({
        ...TOAST_MSG.demo.login,
        description:
          "Invalid credentials. Please contact Cyphr Team for your sandbox account."
      })
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit((data) => {
            mutate(data, {
              onSuccess: () => handleDemoAuth(data.email)
            })
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="hover:border hover:shadow-md focus:border focus:drop-shadow-lg">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {demoRoleByEmailOptions().map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <FormControl className="hover:border hover:shadow-md focus:border focus:drop-shadow-lg">
                  <InputPassword
                    autoComplete="current-password"
                    className="text-base"
                    placeholder="••••••••"
                    {...field}
                    disabled
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
