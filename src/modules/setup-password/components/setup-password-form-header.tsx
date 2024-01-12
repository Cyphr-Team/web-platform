import { useFormContext } from "react-hook-form"
import { UserFormValue } from "../hooks/useSetupPassword"
import { useMemo } from "react"
import { CheckCircle2, Lock } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function SetupPasswordFormHeader() {
  const { getValues } = useFormContext<UserFormValue>()
  const successMsg = getValues("successMsg")

  const dataHeader = useMemo(() => {
    return successMsg
      ? {
          HeaderIcon: CheckCircle2,
          title: "Password reset",
          description:
            "Your password has been successfully reset. Click below to log in magically."
        }
      : {
          HeaderIcon: Lock,
          title: "Set new password",
          description:
            "Your new password must be different to previously used passwords."
        }
  }, [successMsg])

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
      </div>
    </div>
  )
}
