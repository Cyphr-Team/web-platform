import { Card } from "@/components/ui/card"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

interface PeopleTotalInfoProps {
  title: string
  value: number
  isCurrency?: boolean
}

export function PeopleTotalInfo(props: PeopleTotalInfoProps) {
  const { title, value, isCurrency } = props

  return (
    <Card className="m-2 flex grow flex-col justify-between rounded-xl border-[#4F6161] p-2 shadow-lg xl:p-4">
      <h5 className="text-xs font-semibold">{title}</h5>
      <p className="text-xl font-medium text-text-placeholder">
        {isCurrency ? `$ ${USDFormatter(value).format()}` : value}
      </p>
    </Card>
  )
}
