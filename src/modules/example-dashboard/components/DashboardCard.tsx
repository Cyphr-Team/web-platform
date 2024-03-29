import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ReactNode, PropsWithChildren } from "react"

type DashboardCardProps = {
  title: ReactNode
  value: ReactNode
  icon?: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
}

export const DashboardCard = ({
  title,
  icon,
  value,
  description,
  className,
  isLoading
}: PropsWithChildren<DashboardCardProps>) => {
  return (
    <Card className={cn(className, "flex flex-col justify-between")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:p-4 md:pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="md:p-4 md:pt-0">
        {!isLoading ? (
          <div className="text-2xl font-bold">{value ?? 0}</div>
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
