import { Card } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import React from "react"

type Props = {
  title: string
  value?: number
  isCurrency?: boolean
  isPercent?: boolean
}

export const CashFlowGlanceCard: React.FC<Props> = ({
  title,
  value,
  isCurrency,
  isPercent
}) => {
  return (
    <Card className="rounded-xl h-32 shadow-none px-3xl py-2 flex flex-col items-start">
      <p className="text-text-tertiary text-md h-1/2">{title}</p>
      <span className="text-2xl 2xl:text-3xl font-semibold">
        {value
          ? isCurrency
            ? toCurrency(value)
            : isPercent
              ? `${value}%`
              : value
          : "N/A"}
      </span>
    </Card>
  )
}
