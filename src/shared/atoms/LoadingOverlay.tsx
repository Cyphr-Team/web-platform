import { Loader2 } from "lucide-react"

type Props = {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}

export const LoadingOverlay: React.FC<Props> = ({
  isLoading,
  children,
  className
}) => {
  return (
    <div className={className}>
      {isLoading ? (
        // This is the loading overlay
        <div className="flex relative h-full w-full">
          <div className="absolute h-full w-full opacity-50 bg-slate-50 z-10 rounded">
            <div className="sticky top-1/2 left-1/2 justify-center items-center w-full flex flex-col">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
