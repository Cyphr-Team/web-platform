import { Badge, BadgeProps } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { PropsWithChildren, ReactNode } from "react"

type DashboardSingleNumberCardProps = {
  title: ReactNode
  value: ReactNode
  icon?: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
  unit?: string
  variantColor: BadgeProps["variantColor"]
}

export const DashboardSingleNumberCard = ({
  title,
  icon,
  value,
  description,
  isLoading,
  unit,
  variantColor
}: PropsWithChildren<DashboardSingleNumberCardProps>) => {
  return (
    <Card className={cn("flex flex-col justify-between rounded-xl")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-2">
        <CardTitle className="text-sm font-semibold text-text-tertiary">
          <Badge
            isDot
            variant="soft"
            variantColor={variantColor}
            className="capitalize text-sm rounded-full px-3 py-1"
          >
            {title}
          </Badge>
        </CardTitle>
        {icon}
      </CardHeader>

      <CardContent className="pt-0 md:pt-0">
        {!isLoading ? (
          <div className="text-3xl font-semibold">
            {value ?? 0}
            {unit && <span className="text-sm"> {unit}</span>}
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
