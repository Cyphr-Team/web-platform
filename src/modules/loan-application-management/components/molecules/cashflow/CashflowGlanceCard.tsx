import { Card } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import React from "react"

type Props = {
  title: string
  value?: number
  isCurrency?: boolean
  isPercent?: boolean
}

export const CashflowGlanceCard: React.FC<Props> = ({
  title,
  value,
  isCurrency,
  isPercent
}) => {
  return (
    <Card className="rounded-xl h-32 shadow-none p-3xl flex flex-col justify-between">
      <p className="text-text-tertiary text-sm">{title}</p>
      <span className="text-2xl 2xl:text-3xl font-semibold mt-md">
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
