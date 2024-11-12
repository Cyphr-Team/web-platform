import { Card } from "@/components/ui/card"

interface Props {
  label: string
  value: string
}
function CashFlowCard({ label, value }: Props) {
  return (
    <Card className="flex flex-col gap-2 rounded-xl p-4 shadow-none xl:p-6">
      <p className="text-sm font-medium text-text-tertiary">{label}</p>
      <span className="text-2xl font-semibold xl:text-3xl">{value}</span>
    </Card>
  )
}

export default CashFlowCard
