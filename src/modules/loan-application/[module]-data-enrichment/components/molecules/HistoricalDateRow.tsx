import { cn } from "@/lib/utils.ts"
import { type ReactNode } from "react"
import { v6 as uuidv6 } from "uuid"

interface TotalRowProps {
  title: string
  data: ReactNode[]
  className?: string
  labelClassName?: string
  itemClassName?: string
}

export function HistoricalDateRow(props: TotalRowProps) {
  const { title, data, className = "", labelClassName, itemClassName } = props

  return (
    <div
      className={cn("grid rounded-lg", className)}
      style={{ gridTemplateColumns: `1fr repeat(${data.length}, 0.7fr)` }}
    >
      <div
        className={cn(
          "col-span-1 flex items-center pl-4 pr-10 text-sm font-semibold",
          "border-t",
          labelClassName
        )}
      >
        {title}
      </div>

      {data.map((value) => (
        <div
          key={uuidv6()}
          className={cn(
            "col-span-1 flex items-center justify-between",
            "h-11 px-4 text-sm font-semibold",
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
