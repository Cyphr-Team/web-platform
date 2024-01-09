"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import SignUpGoogleButton from "./sign-up-google-button"
import { SeparatorWithText } from "@/components/ui/separator-with-text"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/routes"

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" })
})

type UserFormValue = z.infer<typeof formSchema>

export function SignUpForm() {
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
    <div className="flex flex-col space-y-6">
      <SignUpGoogleButton />

      <SeparatorWithText text="OR" />

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
                    placeholder="Enter your email..."
                    disabled={loading}
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="ml-auto w-full text-base"
            type="submit"
          >
            Get started
          </Button>
        </form>
      </Form>
    </div>
  )
}
