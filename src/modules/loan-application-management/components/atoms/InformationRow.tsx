import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface Props {
  label: string
  value: string
  className?: string
  isLoading?: boolean
}

export const InformationRow: React.FC<Props> = ({
  label,
  value,
  className,
  isLoading = false
}) => (
  <div
    className={cn(
      "grid-cols-2 grid grid-flow-row border border-t-0 border-l-0",
      className
    )}
  >
    <div className="pl-xl xl:pl-3xl py-xl xl:py-3xl flex items-center">
      <p
        className={cn(
          "text-sm text-text-tertiary break-words",
          !value && "whitespace-nowrap text-foreground font-medium"
        )}
      >
        {label}
      </p>
    </div>
    <div className="py-xl xl:py-3xl pl-xl xl:pl-3xl flex items-center col-span-1 break-words pr-xl">
      {isLoading ? (
        <Skeleton className="w-[80%] h-full" />
      ) : (
        <p className="font-medium text-sm break-all">{value}</p>
      )}
    </div>
  </div>
)
