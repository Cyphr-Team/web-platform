import { cn } from "@/lib/utils"

interface AnswersTextDisplayProps {
  label: string
  value?: string
  className?: string
  valueClassName?: string
  labelClassName?: string
}

interface MultiAnswersTextDisplayProps {
  label: string
  value?: string[]
  className?: string
}

export function AnswersTextDisplay({
  label,
  value,
  className,
  valueClassName,
  labelClassName
}: AnswersTextDisplayProps) {
  return (
    <div className={cn("flex flex-col gap-sm", className)}>
      <div
        className={cn("text-sm font-medium text-text-primary", labelClassName)}
      >
        {label}
      </div>
      <p className={cn("items-center text-sm font-normal", valueClassName)}>
        {value ?? "N/A"}
      </p>
    </div>
  )
}

export function MultiAnswersTextDisplay({
  label,
  value,
  className
}: MultiAnswersTextDisplayProps) {
  return (
    <div className={cn(className, "flex flex-col gap-sm")}>
      <div className="text-sm font-medium text-text-primary">{label}</div>
      {value?.map((v, i) => (
        <p key={i} className="items-center text-sm font-normal">
          {v}
        </p>
      ))}
    </div>
  )
}
