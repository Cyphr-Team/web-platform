import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import { useActiveEmailDataHeader } from "../hooks/useActiveEmailDataHeader"
import { useActiveEmailSearchParams } from "../hooks/useActiveEmailSearchParams"
import { ErrorCode } from "@/utils/custom-error"

interface ActivateEmailFormHeaderProps {
  isPending: boolean
  isSuccess: boolean
  errorCode: ErrorCode
}

export function ActivateEmailFormHeader({
  isPending,
  isSuccess,
  errorCode
}: ActivateEmailFormHeaderProps) {
  const { email } = useActiveEmailSearchParams()
  const dataHeader = useActiveEmailDataHeader({
    isPending,
    isSuccess,
    errorCode
  })

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
              <dataHeader.HeaderIcon
                size={28}
                className={cn(isPending && "animate-spin")}
              />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mt-6">
        {dataHeader.title}
      </h1>

      <div className="text-muted-foreground mt-3">
        <p className="font-medium">{email}</p>
        <p>{dataHeader.description}</p>
      </div>
    </div>
  )
}
