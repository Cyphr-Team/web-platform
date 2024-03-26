import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import {
  GetStartUserFormValue,
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
        <form onSubmit={formSubmit} className="space-y-4 w-full">
          <ButtonLoading
            isLoading={isPending}
            className="ml-auto w-full text-base"
            type="submit"
          >
            {buttonContent ?? "Get new email verification link"}
          </ButtonLoading>
        </form>
      </Form>
    </div>
  )
}
