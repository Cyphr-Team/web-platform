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
      <div className="absolute z-10 size-full rounded bg-zinc-50/50">
        <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center">
          {isWorkspaceAdmin ? "This applicant" : "You"} have not submitted or
          our system is processing it, please wait!
        </div>
      </div>
    </div>
  ) : (
    children
  )
}
