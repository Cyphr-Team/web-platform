import { cn } from "@/lib/utils.ts"
import usePermissions from "@/hooks/usePermissions.ts"
import { type PropsWithChildren } from "react"
import { RefreshCcw } from "lucide-react"
import { type Noop } from "react-hook-form"

interface ErrorWrapperProps {
  isError: boolean
  isLoading?: boolean
  className?: string
  onReload?: Noop
}

export function ErrorWrapper(props: PropsWithChildren<ErrorWrapperProps>) {
  const { isError, isLoading, children, className, onReload } = props
  const { isWorkspaceAdmin } = usePermissions()

  return isError ? (
    <div
      className={cn(
        "relative flex h-[50vh] items-center justify-center",
        className
      )}
    >
      <div className="absolute z-10 size-full rounded bg-zinc-50/50">
        <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center gap-y-2xl">
          {isWorkspaceAdmin ? "This applicant" : "You"} have not submitted or
          our system is processing it, please wait!
          {onReload !== undefined && !isLoading ? (
            <RefreshCcw className="cursor-pointer" onClick={onReload} />
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    children
  )
}
