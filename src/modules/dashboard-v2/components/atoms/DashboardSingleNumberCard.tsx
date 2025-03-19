import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, type ReactNode } from "react"

interface DashboardSingleNumberCardProps {
  title: ReactNode
  value: ReactNode
  icon?: ReactNode
  description?: ReactNode
  className?: string
  isLoading?: boolean
  unit?: string
  variantColor: BadgeProps["variantColor"]
  badgeProps?: BadgeProps
}

export function DashboardSingleNumberCard({
  title,
  icon,
  value,
  description,
  isLoading,
  unit,
  variantColor,
  badgeProps
}: PropsWithChildren<DashboardSingleNumberCardProps>) {
  return (
    <Card className={cn("flex flex-col justify-between rounded-xl")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 md:pb-2">
        <CardTitle className="text-sm font-semibold text-text-tertiary">
          <Badge
            isDot
            className="rounded-full px-3 py-1 text-sm capitalize"
            variant="soft"
            variantColor={variantColor}
            {...badgeProps}
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
