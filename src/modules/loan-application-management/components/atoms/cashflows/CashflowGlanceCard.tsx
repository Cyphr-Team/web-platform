import { Card } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import React from "react"

interface Props {
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
    <Card className="flex h-32 flex-col items-start rounded-xl px-3xl py-2 shadow-none">
      <p className="text-md h-1/2 text-text-tertiary">{title}</p>
      <span className="text-2xl font-semibold 2xl:text-3xl">
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
