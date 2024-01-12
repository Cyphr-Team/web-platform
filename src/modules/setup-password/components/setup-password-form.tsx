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
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { UserFormValue, useSetupPassword } from "../hooks/useSetupPassword"
import { SetupPasswordFormHeader } from "./setup-password-form-header"
import { SetupPasswordMatch } from "./setup-password-matcher"

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, setValue } = useFormContext<UserFormValue>()

  const onSubmit = async (data: UserFormValue) => {
    try {
      console.log(data)
      setValue("successMsg", "Redirect message")
    } catch {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="••••••••"
                disabled={loading}
                className="text-base"
                {...field}
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

      <div className="flex flex-col space-y-2">
        <SetupPasswordMatch />
      </div>

      <Button
        disabled={loading}
        className="ml-auto w-full text-base"
        type="submit"
      >
        Reset password
      </Button>
    </form>
  )
}

function SuccessReset() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col space-y-5 w-full items-center">
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
  const { form } = useSetupPassword()

  const successMsg = form.getValues("successMsg")

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
          variant="link"
          className="px-1 text-sm text-foreground py-0 self-center"
          asChild
        >
          <a href={APP_PATH.LOGIN}>
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to log in
          </a>
        </Button>
      )}
    </>
  )
}
