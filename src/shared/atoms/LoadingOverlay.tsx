import { Loader2 } from "lucide-react"
import { type PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  isLoading: boolean
  className?: string
}

export function LoadingOverlay({ isLoading, children, className }: Props) {
  return (
    <div className={className}>
      {isLoading ? (
        // This is the loading overlay
        <div className="relative flex size-full">
          <div className="absolute z-10 size-full rounded bg-slate-50 opacity-50">
            <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center">
              <Loader2 className="size-10 animate-spin text-primary" />
              Loading...
            </div>
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
