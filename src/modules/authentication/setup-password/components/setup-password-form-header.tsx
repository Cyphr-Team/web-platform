import { useFormContext } from "react-hook-form"
import { type SetupPasswordFormValue } from "../hooks/useSetupPassword"
import { useMemo } from "react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { UI_DATA_SETUP_PASSWORD_HEADER } from "../constants"

export function SetupPasswordFormHeader() {
  const { getValues } = useFormContext<SetupPasswordFormValue>()
  const successMsg = getValues("successMsg")

  const dataHeader = useMemo(() => {
    return successMsg
      ? UI_DATA_SETUP_PASSWORD_HEADER.success
      : UI_DATA_SETUP_PASSWORD_HEADER.enterPassword
  }, [successMsg])

  return (
    <div className="flex flex-col text-center">
      <div className="relative flex justify-center">
        <img
          alt="Pattern decorative"
          className="absolute left-1/2 top-[28px] -z-10 size-[756px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 dark:opacity-15"
          height={756}
          src={backgroundPatternDecorative}
          width={756}
        />
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
      </div>
    </div>
  )
}
