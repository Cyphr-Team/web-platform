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
  SetupProfileFormSchema,
  setupProfileFormSchema,
  useSetupProfile
} from "../hooks/useSetupProfile"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
import { isAxiosError } from "axios"
import { useCountdown } from "@/hooks/useCountdown"
import { useEffect } from "react"
import { inMemoryJWTService } from "@/services/jwt.service"
import { APP_PATH } from "@/constants"
import { AppAlert } from "@/components/ui/alert"

export function SetupProfileForm() {
  const { email } = useParams()
  const navigate = useNavigate()

  const form = useForm<SetupProfileFormSchema>({
    resolver: zodResolver(setupProfileFormSchema),
    defaultValues: {
      name: "",
      email,
      password: ""
    }
  })

  const { mutate, isPending, isSuccess } = useSetupProfile()

  const { count } = useCountdown({
    initialCount: 4,
    isStart: isSuccess
  })

  useEffect(() => {
    if (count < 1) {
      inMemoryJWTService.eraseToken()
      navigate(APP_PATH.LOGIN)
    }
  }, [count, navigate])

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="text-base"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="text-base font-medium border-0 p-0 disabled:opacity-1"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Create a password"
                    className="text-base"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <ErrorMessage className="whitespace-pre-wrap">
              {form.formState.errors.root?.serverError?.message}
            </ErrorMessage>

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
              className="w-full text-base mt-3"
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
