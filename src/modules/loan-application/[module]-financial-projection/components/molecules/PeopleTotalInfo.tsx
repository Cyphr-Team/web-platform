import { Card } from "@/components/ui/card"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"

interface PeopleTotalInfoProps {
  title: string
  value: number
  isCurrency?: boolean
}

export const PeopleTotalInfo = (props: PeopleTotalInfoProps) => {
  const { title, value, isCurrency } = props
  return (
    <Card className="border-[#4F6161] shadow-lg rounded-xl xl:p-4 p-2 flex flex-col justify-between m-2 grow">
      <h5 className="text-xs font-semibold">{title}</h5>
      <p className="text-xl font-medium">
        {isCurrency ? `$${USDFormatter(value).format()}` : value}
      </p>
    </Card>
  )
}
