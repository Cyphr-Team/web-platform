import { Card } from "@/components/ui/card"
import React from "react"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

type CashFlowGlanceType = "currency" | "percent" | "default"

type Props = {
  title: string
  value?: number | string
  type?: CashFlowGlanceType
}

const typeMapper: { [key in CashFlowGlanceType]: CallableFunction } = {
  currency: (value: number) => `$ ${USDFormatter(value).format()}`,
  percent: (value: string) => `${value}%`,
  default: (value?: string | number) => value ?? "N/A"
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
