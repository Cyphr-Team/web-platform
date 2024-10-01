import { cn } from "@/lib/utils.ts"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { PropsWithChildren } from "react"

function currencyCellFormatter(value: number) {
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
  isEnd?: boolean
  layout?: "total" | "percentage" | "item" | "subTotal"
}

const gridMapper: { [key: number]: string } = {
  1: "grid grid-cols-2",
  15: "grid grid-cols-16"
}

export const DataRow = (props: DataRowProps) => {
  const { title, data, collision = false, layout = "total", className } = props

  return (
    <div className={cn(gridMapper[data.length], className)}>
      <StyledComponent layout={layout} collision={collision}>
        <div
          className={cn(
            "text-sm",
            layout === "percentage" ? "italic" : null,
            layout === "item" ? "pl-4" : null
          )}
        >
          {title}
        </div>
      </StyledComponent>
      {data.map((value) => {
        const inner =
          layout === "percentage" ? (
            <>
              <div></div>
              <div>{value} %</div>
            </>
          ) : (
            <>
              <div>$</div>
              <div>{currencyCellFormatter(value)}</div>
            </>
          )

        return (
          <StyledComponent key={value} layout={layout} collision={collision}>
            {inner}
          </StyledComponent>
        )
      })}
    </div>
  )
}

const layoutRenderer = {
  total: "border border-l-0 border-b-0 border-y-black font-semibold",
  subTotal: "border border-l-0  font-semibold",
  item: "border border-l-0 border-b-0",
  percentage: "border border-l-0 border-b-0"
}

interface StyledComponentProps extends PropsWithChildren {
  layout: "total" | "percentage" | "item" | "subTotal"
  collision: boolean
}

const StyledComponent = (props: StyledComponentProps) => {
  const { children, layout, collision } = props

  return (
    <div
      className={cn(
        "flex justify-between px-4 h-11 items-center text-sm",
        layoutRenderer[layout],
        collision ? "border-b-0" : null
      )}
    >
      {children}
    </div>
  )
}
