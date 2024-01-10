"use client"
import { Button } from "@/components/ui/button"
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
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginGoogleButton } from "./login-google-button"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string({ required_error: "Password is required" }),
  remember: z.boolean().optional()
})

type UserFormValue = z.infer<typeof formSchema>

export function LoginForm() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const defaultValues = {
    email: "larry@borrower.com"
  }
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: UserFormValue) => {
    try {
      console.log(data)
      navigate(APP_PATH.VERIFY_EMAIL)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={loading}
                    className="text-base"
                    {...field}
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={loading}
                    className="text-base"
                    {...field}
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
                <a href={APP_PATH.FORGOT_PASSWORD}>Forgot password</a>
              </Button>
            </p>
          </div>

          <Button
            disabled={loading}
            className="ml-auto w-full text-base"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>

      <LoginGoogleButton />
    </div>
  )
}
