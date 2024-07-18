import { cn } from "@/lib/utils"

type AnswersTextDisplayProps = {
  label: string
  value?: string | null
  className?: string
}

type MultiAnswersTextDisplayProps = {
  label: string
  value?: string[]
  className?: string
}

export const AnswersTextDisplay = ({
  label,
  value,
  className
}: AnswersTextDisplayProps) => {
  return (
    <div className={cn(className, "gap-sm flex flex-col")}>
      <div className="text-text-primary font-medium text-sm">{label}</div>
      <p className="text-sm items-center font-normal">{value ?? "N/A"}</p>
    </div>
  )
}

export const MultiAnswersTextDisplay = ({
  label,
  value,
  className
}: MultiAnswersTextDisplayProps) => {
  return (
    <div className={cn(className, "gap-sm flex flex-col")}>
      <div className="text-text-primary font-medium text-sm">{label}</div>
      {value?.map((v, i) => (
        <p key={i} className="text-sm items-center font-normal">
          {v}
        </p>
      ))}
    </div>
  )
}
