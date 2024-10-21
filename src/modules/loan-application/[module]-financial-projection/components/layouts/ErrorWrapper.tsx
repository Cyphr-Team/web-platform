import { cn } from "@/lib/utils.ts"
import usePermissions from "@/hooks/usePermissions.ts"
import { type PropsWithChildren } from "react"

interface ErrorWrapperProps {
  isError: boolean
  className?: string
}

export function ErrorWrapper(props: PropsWithChildren<ErrorWrapperProps>) {
  const { isError, children, className } = props
  const { isWorkspaceAdmin } = usePermissions()

  return isError ? (
    <div
      className={cn(
        "flex justify-center items-center relative h-[50vh]",
        className
      )}
    >
      <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
        <div className="sticky top-1/2 left-1/2 justify-center items-center w-full flex flex-col">
          {isWorkspaceAdmin ? "This applicant" : "You"} have not submitted or
          our system is processing it, please wait!
        </div>
      </div>
    </div>
  ) : (
    children
  )
}
