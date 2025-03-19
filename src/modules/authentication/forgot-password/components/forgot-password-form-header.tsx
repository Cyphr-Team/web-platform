import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { type ForgotPasswordFormValue } from "../hooks/useForgotPassword"
import { UI_DATA_FORGOT_PASSWORD_HEADER } from "../constants"

export function ForgotPasswordFormHeader() {
  const { getValues } = useFormContext<ForgotPasswordFormValue>()
  const email = getValues("successSentEmail")

  const dataHeader = useMemo(() => {
    return email
      ? UI_DATA_FORGOT_PASSWORD_HEADER.sent
      : UI_DATA_FORGOT_PASSWORD_HEADER.enterEmail
  }, [email])

  return (
    <div className="flex flex-col text-center">
      <div className="relative flex justify-center">
        <div className="w-[56px] self-center">
          <AspectRatio ratio={1 / 1}>
            <div className="flex size-full items-center justify-center rounded-xl border">
              <dataHeader.HeaderIcon size={28} />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {dataHeader.title}
      </h1>

      <div className="mt-3 text-muted-foreground">
        <p>{dataHeader.description}</p>
        {!!email && <p className="font-medium">{email}</p>}
      </div>
    </div>
  )
}
