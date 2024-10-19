import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import { type ErrorCode } from "@/utils/custom-error"
import { useActiveEmailDataHeader } from "../hooks/useActiveEmailDataHeader"

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
  const dataHeader = useActiveEmailDataHeader({
    isPending,
    isSuccess,
    errorCode
  })

  return (
    <div className="flex flex-col text-center">
      <div className="flex justify-center relative">
        <div className="w-[56px] self-center">
          <AspectRatio ratio={1 / 1}>
            <div className="w-full h-full border flex justify-center items-center rounded-xl">
              <dataHeader.HeaderIcon
                className={cn(isPending && "animate-spin")}
                size={28}
              />
            </div>
          </AspectRatio>
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mt-6">
        {dataHeader.title}
      </h1>

      <div className="mt-3 text-text-tertiary">
        <p>{dataHeader.description}</p>
      </div>
    </div>
  )
}
