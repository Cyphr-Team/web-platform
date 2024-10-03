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
    <div className={cn(GridMapper[data.length], className)}>
      <div
        className={cn(
          "col-span-1 flex items-center border border-l-0 border-b-0",
          labelClassName
        )}
      >
        <div className="pl-4 pr-10 text-sm font-semibold ">{title}</div>
      </div>

      {data.map((value) => (
        <div
          key={value?.toString()}
          className={cn(
            "flex items-center justify-between col-span-1",
            "border border-l-0 border-b-0",
            "px-4 h-11 font-semibold text-sm",
            itemClassName
          )}
        >
          {value}
        </div>
      ))}
    </div>
  )
}
