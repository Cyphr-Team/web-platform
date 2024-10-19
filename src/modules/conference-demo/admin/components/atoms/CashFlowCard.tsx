import { Card } from "@/components/ui/card"

interface Props {
  label: string
  value: string
}
function CashFlowCard({ label, value }: Props) {
  return (
    <Card className="rounded-xl shadow-none xl:p-6 p-4 flex flex-col gap-2">
      <p className="text-text-tertiary text-sm font-medium">{label}</p>
      <span className="text-2xl xl:text-3xl font-semibold">{value}</span>
    </Card>
  )
}

export default CashFlowCard
