import { type FC, type ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface Props {
  isError: boolean
  children: ReactNode
  className?: string
}

export const ErrorWrapper: FC<Props> = ({ isError, children, className }) => {
  return isError ? (
    <div
      className={cn(
        "flex justify-center items-center relative h-[50vh]",
        className
      )}
    >
      <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
        <div className="sticky top-1/2 left-1/2 justify-center items-center w-full flex flex-col">
          You don't have any financial projection or our system is processing
          it, please wait!
        </div>
      </div>
    </div>
  ) : (
    children
  )
}
