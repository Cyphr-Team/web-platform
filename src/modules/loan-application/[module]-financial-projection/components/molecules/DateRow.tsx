import { cn } from "@/lib/utils.ts"
import { ReactNode } from "react"
import { GridMapper } from "@/modules/loan-application/[module]-financial-projection/constants"

interface TotalRowProps {
  title: string
  data: ReactNode[]
  className?: string
  labelClassName?: string
  itemClassName?: string
}

export const DateRow = (props: TotalRowProps) => {
  const { title, data, className = "", labelClassName, itemClassName } = props

  return (
    <div className={cn(GridMapper[data.length], "rounded-lg", className)}>
      <div
        className={cn(
          "col-span-1 flex items-center text-sm font-semibold pl-4 pr-10",
          "border-t",
          labelClassName
        )}
      >
        {title}
      </div>

      {data.map((value) => (
        <div
          key={value?.toString()}
          className={cn(
            "flex items-center justify-between col-span-1",
            "px-4 h-11 font-semibold text-sm",
            "border-l border-t",
            itemClassName
          )}
        >
          {value}
        </div>
      ))}
    </div>
  )
}
