import { Progress } from "@/components/ui/progress.tsx"
import { FC } from "react"
import { cn } from "@/lib/utils.ts"

interface Props {
  value: number
  className?: string
  valueClassName?: string
}

const ProgressCell: FC<Props> = ({ value, className, valueClassName }) => {
  return (
    <div className={cn("flex flex-row items-center gap-2 w-full", className)}>
      <Progress value={value} />
      <div className={valueClassName}>{value}%</div>
    </div>
  )
}

export default ProgressCell
