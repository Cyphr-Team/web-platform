import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <Card className="rounded-xl h-32">
      <CardHeader className="text-text-tertiary text-sm">{title}</CardHeader>
      <CardContent>
        <span className="text-2xl lg:text-3xl font-semibold ">
          {value
            ? isCurrency
              ? toCurrency(value)
              : isPercent
                ? `${value}%`
                : value
            : "N/A"}
        </span>
      </CardContent>
    </Card>
  )
}
