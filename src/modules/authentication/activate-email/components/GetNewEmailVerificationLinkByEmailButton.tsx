import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import {
  type GetStartUserFormValue,
  getStartFormSchema,
  useGetStart
} from "../../hooks/useGetStart"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"

export function GetNewEmailVerificationLinkByEmailButton({
  buttonContent
}: {
  buttonContent?: ReactNode
}) {
  const { email } = useActiveEmailSearchParams()

  const { isPending, mutate } = useGetStart()
  const [searchParams] = useSearchParams()

  const form = useForm<GetStartUserFormValue>({
    resolver: zodResolver(getStartFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? email ?? ""
    }
  })

  const formSubmit = form.handleSubmit((data) => mutate(data))

  return (
    <div className="flex flex-col space-y-6">
      <Form {...form}>
        <form className="w-full space-y-4" onSubmit={formSubmit}>
          <ButtonLoading
            className="ml-auto w-full text-base"
            isLoading={isPending}
            type="submit"
          >
            {buttonContent ?? "Get new email verification link"}
          </ButtonLoading>
        </form>
      </Form>
    </div>
  )
}
