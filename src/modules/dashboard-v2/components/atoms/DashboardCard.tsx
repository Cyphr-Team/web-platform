import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, type ReactNode } from "react"
import { DashboardStatsRate } from "./DashboardStatsRate"

interface DashboardCardProps {
  title: ReactNode
  value: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
  unit?: string

  percentRate?: number
  revert?: boolean
}

export function DashboardCard({
  title,
  value,
  description,
  className,
  isLoading,
  unit,
  percentRate,
  revert
}: PropsWithChildren<DashboardCardProps>) {
  return (
    <Card className={cn(className, "flex flex-col justify-between rounded-xl")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3">
        <CardTitle className="text-sm font-medium text-text-tertiary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 md:pt-0">
        {!isLoading ? (
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="break-world text-3xl font-semibold">
              {value ?? 0}
              {unit ? <span> {unit}</span> : null}
            </div>

            {percentRate !== null && percentRate !== undefined && (
              <div>
                <DashboardStatsRate percentRate={percentRate} revert={revert} />
              </div>
            )}
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
