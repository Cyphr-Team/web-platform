import { cn } from "@/lib/utils.ts"
import { type PropsWithChildren } from "react"
import { currencyCellFormatter } from "@/utils/currency.utils.ts"

interface DataRowProps {
  title: string
  data: number[]
  className?: string
  collision?: boolean
  layout?: "total" | "percentage" | "item" | "subTotal"
  isEnd?: boolean
}

export function HistoricalDataRow({
  title,
  data,
  collision = false,
  layout = "total",
  className,
  isEnd
}: DataRowProps) {
  return (
    <div
      className={cn(className, "grid")}
      style={{ gridTemplateColumns: `1fr repeat(${data.length}, 0.7fr)` }}
    >
      <StyledComponent collision={collision} isEnd={isEnd} layout={layout}>
        <div className={cn("text-sm", getTitlePadding(layout))}>{title}</div>
      </StyledComponent>

      {data.map((value, index) => (
        <StyledComponent
          key={`${title}-${index}`}
          className="border-l"
          collision={collision}
          isEnd={isEnd}
          layout={layout}
        >
          {layout === "percentage" ? (
            <>
              <div />
              <div>{value} %</div>
            </>
          ) : (
            <>
              <div>$</div>
              <div>{currencyCellFormatter(value)}</div>
            </>
          )}
        </StyledComponent>
      ))}
    </div>
  )
}

interface StyledComponentProps extends PropsWithChildren {
  layout: "total" | "percentage" | "item" | "subTotal"
  isEnd?: boolean
  collision: boolean
  className?: string
}

function StyledComponent({
  children,
  layout,
  collision,
  isEnd = false,
  className
}: StyledComponentProps) {
  return (
    <div
      className={cn(
        "flex h-11 items-center justify-between border-t px-4 text-sm",
        getLayoutClasses(layout),
        isEnd || collision ? "border-b-0" : null,
        className
      )}
    >
      {children}
    </div>
  )
}

const getTitlePadding = (
  layout: "total" | "percentage" | "item" | "subTotal"
): string | null => {
  switch (layout) {
    case "percentage":
    case "item":
      return "pl-4"
    default:
      return null
  }
}

const getLayoutClasses = (
  layout: "total" | "percentage" | "item" | "subTotal"
): string => {
  switch (layout) {
    case "total":
      return "border-y-black font-semibold"
    case "subTotal":
      return "font-semibold"
    default:
      return ""
  }
}
