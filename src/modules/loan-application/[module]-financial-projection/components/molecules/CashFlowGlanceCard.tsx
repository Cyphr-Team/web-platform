import { Card } from "@/components/ui/card"
import React from "react"
import { currencyCellFormatter } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"

type CashFlowGlanceType = "currency" | "percent" | "default"

interface Props {
  title: string
  value?: number | string
  type?: CashFlowGlanceType
}

const typeMapper: { [key in CashFlowGlanceType]: CallableFunction } = {
  currency: (value: number) => {
    const formatted = currencyCellFormatter(value)

    return formatted !== "-" ? `$ ${formatted}` : formatted
  },
  percent: (value: string) => (value ? `${value}%` : "-"),
  default: (value?: string | number) => value ?? "-"
}

export const CashFlowGlanceCard: React.FC<Props> = ({
  title,
  value,
  type = "default"
}) => {
  const formatter = typeMapper[type]

  return (
    <Card className="rounded-xl h-32 shadow-none px-3xl flex flex-col items-start justify-center space-y-3">
      <p className="text-text-primary font-normal text-sm">{title}</p>
      <span className="text-2xl font-semibold">{formatter(value)}</span>
    </Card>
  )
}
