import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type ReactNode, type PropsWithChildren } from "react"

interface UsageCardProps {
  title: ReactNode
  currentUsage: number
  limit: number
  icon?: ReactNode
  className?: string
  isLoading?: boolean
  /**
   * The percentage at which the card should be in alert state
   */
  alertThreshold?: number
  /**
   * The percentage at which the card should be in warning state
   */
  warnThreshold?: number
  unit?: string
  cta?: ReactNode
  isNotFoundSubscription?: boolean
}

export function UsageCard({
  title,
  icon,
  className,
  isLoading,
  currentUsage,
  limit,
  alertThreshold,
  warnThreshold,
  unit,
  cta,
  isNotFoundSubscription
}: PropsWithChildren<UsageCardProps>) {
  const percentUsage = limit ? Math.round((currentUsage / limit) * 100) : 0
  const isAlerting =
    alertThreshold && limit ? percentUsage > alertThreshold : false
  const isWarning =
    !isAlerting && warnThreshold && limit ? percentUsage > warnThreshold : false

  return (
    <Card className={cn(className, "flex flex-col overflow-hidden rounded-xl")}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-1 space-y-0 pb-2 md:p-3 md:py-2">
        <CardTitle className="text-sm font-medium text-text-secondary">
          {title}
        </CardTitle>

        <div className="flex flex-wrap items-center justify-between gap-1">
          <p className="font-bold">
            {isNotFoundSubscription ? (
              <span className="text-sm">No subscription found</span>
            ) : (
              <>
                <span>
                  {currentUsage} / {limit}{" "}
                  {unit ? <span className="text-sm">{unit}</span> : null}
                </span>
                <span className="ml-1">{icon}</span>
              </>
            )}
          </p>
        </div>
      </CardHeader>

      {!isNotFoundSubscription && (
        <CardContent className="z-10 flex-1 rounded-b-2xl border-b bg-white md:p-3 md:pt-0">
          {!isLoading ? (
            <div className="flex flex-col gap-2">
              <Progress
                className="rounded"
                indicatorClassName={cn(
                  isAlerting && "bg-red-400",
                  isWarning && "bg-yellow-400"
                )}
                value={percentUsage}
              />
            </div>
          ) : (
            <Skeleton className="h-4 w-full" />
          )}
        </CardContent>
      )}

      {!!cta && (
        <CardFooter
          className={cn(
            "-mt-4 bg-slate-100 px-2 pb-0 pr-1 pt-4",
            "md:px-2 md:pb-0 md:pr-1 md:pt-4",
            isNotFoundSubscription && "mt-auto pt-0 md:pt-0"
          )}
        >
          {cta}
        </CardFooter>
      )}
    </Card>
  )
}
