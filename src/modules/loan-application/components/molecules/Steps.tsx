import { LOAN_APPLICATION_STEP_STATUS } from "../../models/LoanApplicationStep/type"
import { Icons } from "../atoms/icon"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  content: string
  status: LOAN_APPLICATION_STEP_STATUS
}

export function Steps({ className, title, content, status }: StepsProps) {
  const isCurrent = status === LOAN_APPLICATION_STEP_STATUS.CURRENT
  const isIncomplete = status === LOAN_APPLICATION_STEP_STATUS.INCOMPLETE

  return (
    <div className={cn(className, "group flex w-full gap-lg")}>
      <div className="flex flex-col items-center">
        {isCurrent
          ? Icons.stepCheckActive({ className: "mb-sm shadow-indigo-500/40" })
          : isIncomplete
            ? Icons.stepCheckInactive({ className: "mb-sm" })
            : Icons.stepCheckComplete({ className: "mb-sm" })}

        <div
          className="mb-sm w-xxs flex-1 rounded-sm bg-primary group-[.last-step]:hidden data-[status=true]:bg-border-secondary"
          data-status={isIncomplete}
        />
      </div>
      <div className="flex flex-col pb-3xl pt-xxs">
        <p
          className="text-sm font-semibold text-text-secondary  data-[status=true]:text-primary"
          data-status={isCurrent}
        >
          {title}
        </p>
        <p
          className="text-sm font-normal text-text-tertiary  data-[status=true]:text-primary"
          data-status={isCurrent}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
