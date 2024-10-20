import { type ReactNode } from "react"
import { DashBoardToolTip } from "./DashBoardToolTip"

interface IChartHintToolTip {
  head: ReactNode
  formula: string | null
  formulaExplain: ReactNode
}

export function ChartHintToolTip({
  head,
  formula,
  formulaExplain
}: IChartHintToolTip) {
  return (
    <DashBoardToolTip
      content={
        <small className="block max-w-[350px]">
          <p className="leading-snug">{head}</p>

          {!!formula && (
            <p className="mt-0.5">
              <strong>Formula:</strong>
              <kbd className="leading-snug inline-flex items-center gap-1 rounded border bg-muted mx-1 px-0.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                {formula}
              </kbd>
            </p>
          )}

          <p>
            <strong>Where:</strong>
          </p>
          <ul className="list-disc px-4 leading-snug">{formulaExplain}</ul>
        </small>
      }
    />
  )
}
