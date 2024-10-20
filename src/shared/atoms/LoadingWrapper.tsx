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
        <div className="flex justify-center items-center relative h-full">
          <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
            <div className="sticky top-1/2 left-1/2 justify-center items-center flex flex-col w-full ">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
