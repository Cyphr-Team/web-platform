import { Loader2 } from "lucide-react"

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

export const LoadingWrapper: React.FC<Props> = ({ isLoading, children }) => {
  return (
    <div className="flex justify-center items-center relative h-full">
      {isLoading ? (
        <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
          <div className="sticky top-0 left-1/2 justify-center items-center w-full flex flex-col">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            Loading...
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
