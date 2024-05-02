import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { PropsWithChildren, ReactNode } from "react"
import { DashboardStatsRate } from "./DashboardStatsRate"

type DashboardCardProps = {
  title: ReactNode
  value: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
  unit?: string

  percentRate?: number
  positive?: boolean
  negative?: boolean
  revert?: boolean
}

export const DashboardCard = ({
  title,
  value,
  description,
  className,
  isLoading,
  unit,
  percentRate,
  positive,
  negative,
  revert
}: PropsWithChildren<DashboardCardProps>) => {
  return (
    <Card className={cn(className, "flex flex-col justify-between rounded-xl")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-3">
        <CardTitle className="text-sm font-medium text-text-tertiary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="md:pt-0 flex-1">
        {!isLoading ? (
          <div className="flex flex-wrap justify-between items-center gap-1">
            <div className="text-3xl font-semibold whitespace-nowrap">
              {value ?? 0}
              {unit && <span> {unit}</span>}
            </div>

            {!!percentRate && (
              <div>
                <DashboardStatsRate
                  percentRate={percentRate}
                  positive={positive}
                  negative={negative}
                  revert={revert}
                />
              </div>
            )}
          </div>
        ) : (
          <Skeleton className="w-full h-8" />
        )}
        {!!description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
