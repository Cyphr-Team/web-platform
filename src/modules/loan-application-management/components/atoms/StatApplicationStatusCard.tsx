import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, type ReactNode } from "react"
import { StatusRoundBadge } from "./StatusRoundBadge"
import { type LoanApplicationStatus } from "../../../../types/loan-application.type"
import { capitalizeFirstOnly, snakeCaseToText } from "../../../../utils"

interface ApplicationStatusStat {
  value: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
  unit?: string
  round: LoanApplicationStatus
}

export function StatApplicationStatusCard({
  value,
  description,
  isLoading,
  unit,
  round
}: PropsWithChildren<ApplicationStatusStat>) {
  return (
    <Card className={cn("flex flex-col justify-between rounded-xl")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-2">
        <CardTitle className="text-sm font-semibold text-text-tertiary">
          <StatusRoundBadge
            className="px-3 py-1 text-xs font-medium"
            isShowIcon={false}
            round={round}
          >
            <h2 className="capitalize">
              {capitalizeFirstOnly(snakeCaseToText(round ?? ""))}
            </h2>
          </StatusRoundBadge>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 md:pt-0">
        {!isLoading ? (
          <div className="text-3xl font-semibold">
            {value ?? 0}
            {unit ? <span className="text-sm"> {unit}</span> : null}
          </div>
        ) : (
          <Skeleton className="h-8 w-full" />
        )}
        {!!description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
