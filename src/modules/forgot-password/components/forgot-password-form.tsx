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
import { useMemo, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import * as z from "zod"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { KeyRound, Mail } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  successSentEmail: z.string().optional()
})

type UserFormValue = z.infer<typeof formSchema>

function ForgotPasswordFormHeader() {
  const { getValues } = useFormContext<UserFormValue>()
  const email = getValues("successSentEmail")

  const dataHeader = useMemo(() => {
    return email
      ? {
          HeaderIcon: Mail,
          title: "Check your email",
          description: "We sent a password reset link to"
        }
      : {
          HeaderIcon: KeyRound,
          title: "Forgot password?",
          description: "No worries, we’ll send you reset instructions."
        }
  }, [email])

  return (
    <div className="flex flex-col text-center">
      <div className="flex justify-center relative">
        <img
          className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
          src={backgroundPatternDecorative}
          alt="Pattern decorative"
          width={756}
          height={756}
        />
        <div className="w-[56px] self-center">
          <AspectRatio ratio={1 / 1}>
            <div className="w-full h-full border flex justify-center items-center rounded-xl">
              <dataHeader.HeaderIcon size={28} />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mt-6">
        {dataHeader.title}
      </h1>

      <div className="text-muted-foreground mt-3">
        <p>{dataHeader.description}</p>
        {!!email && <p className="font-medium">{email}</p>}
      </div>
    </div>
  )
}

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, setValue } = useFormContext<UserFormValue>()

  const onSubmit = async (data: UserFormValue) => {
    try {
      setValue("successSentEmail", data.email)
    } catch {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
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

function ResendForm() {
  const [loading, setLoading] = useState(false)

  const handleOpenEmailApp = () => {
    window.open("mailto:")
  }

  const handleResend = () => {
    try {
      setLoading(true)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-6 w-full items-center">
      <Button
        className="ml-auto w-full text-base"
        type="button"
        onClick={handleOpenEmailApp}
      >
        Open email app
      </Button>

      <div>
        <p className="text-center text-sm text-muted-foreground inline mr-1">
          Didn’t receive the email?
        </p>
        <Button
          disabled={loading}
          type="button"
          variant="ghost"
          className="p-1 h-8 inline text-primary"
          onClick={handleResend}
        >
          Click to resend
        </Button>
      </div>
    </div>
  )
}

export function ForgotPasswordForm() {
  const defaultValues = {
    email: ""
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit"
  })

  const successSentEmail = form.getValues("successSentEmail")

  return (
    <Form {...form}>
      <ForgotPasswordFormHeader />
      <div className="flex flex-col space-y-6">
        {successSentEmail ? <ResendForm /> : <ResetPasswordForm />}
      </div>
    </Form>
  )
}
