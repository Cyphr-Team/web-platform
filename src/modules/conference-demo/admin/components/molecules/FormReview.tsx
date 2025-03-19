import { Separator } from "@/components/ui/separator.tsx"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay.tsx"
import { Card } from "@/components/ui/card.tsx"
import { memo } from "react"

interface DataPoint {
  label: string
  value: string
}

interface Props {
  title: string
  data: DataPoint[]
}

function FormReview(props: Props) {
  const { title, data } = props

  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">{title}</h5>
      <Separator />
      <div className="flex flex-col gap-4xl">
        {data.map(({ label, value }) => (
          <AnswersTextDisplay
            key={value}
            className="!flex-row justify-between"
            label={label}
            value={value}
            valueClassName="text-right"
          />
        ))}
      </div>
    </Card>
  )
}

export default memo(FormReview)
