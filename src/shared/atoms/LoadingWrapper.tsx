import { Loader2 } from "lucide-react"
import { type PropsWithChildren, useEffect, useState } from "react"

interface Props extends PropsWithChildren {
  isLoading: boolean
  className?: string
}

export function LoadingWrapper(props: Props) {
  const { isLoading, children, className } = props
  const [loadingMessage, setLoadingMessage] = useState("Loading...")

  useEffect(() => {
    if (isLoading) {
      const timeout1 = setTimeout(
        () => setLoadingMessage("Calculating..."),
        2000
      )
      const timeout2 = setTimeout(() => setLoadingMessage("Finishing..."), 5000)

      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
      }
    }
  }, [isLoading])

  return (
    <div className={className}>
      {isLoading ? (
        <div className="relative flex h-full items-center justify-center">
          <div className="absolute z-10 size-full rounded bg-zinc-50/50">
            <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center ">
              <Loader2 className="size-10 animate-spin text-primary" />
              {loadingMessage}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
