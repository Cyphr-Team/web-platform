import { cn } from "@/lib/utils"

type SkeletonCardProps = {
  isCircle?: boolean
  isTitle?: boolean
  numberOfLines?: number
} & React.HTMLAttributes<HTMLDivElement>

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted-foreground/20",
        className
      )}
      {...props}
    />
  )
}

function SkeletonCard({
  isCircle,
  isTitle = true,
  className,
  numberOfLines = 3
}: SkeletonCardProps) {
  return (
    <div className={cn("flex w-[250px] flex-col gap-3", className)}>
      {isTitle ? (
        <Skeleton
          className={cn(
            "h-[125px] w-full shrink-0 rounded-xl",
            isCircle && "size-[80px] rounded-full"
          )}
        />
      ) : null}

      {!!numberOfLines && (
        <div className="w-full max-w-full space-y-2">
          {new Array(numberOfLines).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      )}
    </div>
  )
}

type TableSkeletonProps = {
  rows?: number
  columns?: number
  cellClassName?: string
  rowClassName?: string
  tableClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

function TableSkeleton({
  rows = 3,
  columns = 4,
  cellClassName,
  rowClassName,
  tableClassName,
  className,
  ...props
}: TableSkeletonProps) {
  return (
    <div className={cn("space-y-2", tableClassName, className)} {...props}>
      {new Array(rows).fill(0).map((_, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex} className={cn("flex gap-2", rowClassName)}>
          {new Array(columns).fill(0).map((_, colIndex) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={colIndex}
              className={cn("h-4 w-full flex-1", cellClassName)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, TableSkeleton }
