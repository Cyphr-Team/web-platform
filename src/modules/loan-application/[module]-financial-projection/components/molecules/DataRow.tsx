import { cn } from "@/lib/utils.ts"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { type PropsWithChildren } from "react"
import { GridMapper } from "@/modules/loan-application/[module]-financial-projection/constants"
import { v6 as uuidv6 } from "uuid"

export function currencyCellFormatter(value: number) {
  if (value === 0) {
    return "-"
  }

  return value > 0
    ? USDFormatter(value).format()
    : `(${USDFormatter(value * -1).format()})`
}

interface DataRowProps {
  title: string
  data: number[]
  className?: string
  collision?: boolean
  layout?: "total" | "percentage" | "item" | "subTotal"
  isEnd?: boolean
}

export function DataRow({
  title,
  data,
  collision = false,
  layout = "total",
  className,
  isEnd
}: DataRowProps) {
  return (
    <div className={cn(GridMapper[data.length], className)}>
      <StyledComponent collision={collision} isEnd={isEnd} layout={layout}>
        <div className={cn("text-sm", getTitlePadding(layout))}>{title}</div>
      </StyledComponent>

      {data.map((value) => (
        <StyledComponent
          key={uuidv6()}
          className="border-l"
          collision={collision}
          isEnd={isEnd}
          layout={layout}
        >
          {layout === "percentage" ? (
            <>
              <div />
              {/* value return is percent, so we must multiply by 100 */}
              <div>{Math.round(value * 100 * 100) / 100} %</div>
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
