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
import { ReactNode, PropsWithChildren } from "react"

type UsageCardProps = {
  title: ReactNode
  currentUsage: number
  limit: number
  icon?: ReactNode
  className?: string
  isLoading?: boolean
  alertThreshold?: number
  warnThreshold?: number
  unit?: string
  cta?: ReactNode
  isNotFoundSubscription?: boolean
}

export const UsageCard = ({
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
}: PropsWithChildren<UsageCardProps>) => {
  const percentUsage = limit ? Math.round((currentUsage / limit) * 100) : 0
  const isAlerting =
    alertThreshold && limit ? percentUsage > alertThreshold : false
  const isWarning =
    !isAlerting && warnThreshold && limit ? percentUsage > warnThreshold : false

  return (
    <Card className={cn(className, "flex flex-col rounded-xl overflow-hidden")}>
      <CardHeader className="flex flex-row flex-wrap justify-between items-center gap-1 space-y-0 pb-2 md:p-3 md:py-2">
        <CardTitle className="text-sm font-medium text-text-secondary">
          {title}
        </CardTitle>

        <div className="flex flex-wrap justify-between gap-1 items-center">
          <p className="font-bold">
            {isNotFoundSubscription ? (
              <span className="text-sm">No subscription found</span>
            ) : (
              <>
                <span>
                  {currentUsage} / {limit}{" "}
                  {unit && <span className="text-sm">{unit}</span>}
                </span>
                <span className="ml-1">{icon}</span>
              </>
            )}
          </p>
        </div>
      </CardHeader>

      {!isNotFoundSubscription && (
        <CardContent className="md:p-3 md:pt-0 z-10 rounded-b-2xl bg-white border-b flex-1">
          {!isLoading ? (
            <div className="flex flex-col gap-2">
              <Progress
                value={percentUsage}
                className="rounded"
                indicatorClassName={cn(
                  isAlerting && "bg-red-400",
                  isWarning && "bg-yellow-400"
                )}
              />
            </div>
          ) : (
            <Skeleton className="w-full h-4" />
          )}
        </CardContent>
      )}

      {!!cta && (
        <CardFooter
          className={cn(
            "bg-slate-100 pb-0 pr-1 px-2 pt-4 -mt-4",
            "md:px-2 md:pr-1 md:pb-0 md:pt-4",
            isNotFoundSubscription && "pt-0 md:pt-0 mt-auto"
          )}
        >
          {cta}
        </CardFooter>
      )}
    </Card>
  )
}
