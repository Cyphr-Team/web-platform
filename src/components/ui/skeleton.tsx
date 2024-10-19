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
    <div className={cn("flex flex-col gap-3 w-[250px]", className)}>
      {isTitle ? (
        <Skeleton
          className={cn(
            "h-[125px] w-full rounded-xl flex-shrink-0",
            isCircle && "h-[80px] w-[80px] rounded-full"
          )}
        />
      ) : null}

      {!!numberOfLines && (
        <div className="space-y-2 w-full max-w-full">
          {new Array(numberOfLines).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      )}
    </div>
  )
}

export { Skeleton, SkeletonCard }
