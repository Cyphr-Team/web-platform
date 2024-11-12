import { Card } from "@/components/ui/card"
import { productServiceFormQuestions } from "./constants"
import { type ProductServiceFormResponse } from "./type"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"

interface Props {
  data?: ProductServiceFormResponse
}

export function ProductServiceFormDetails({ data }: Props) {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
      <h5 className="text-lg font-semibold">Product and Service</h5>
      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <AnswersTextDisplay
          key="businessType"
          className="!flex-row justify-between capitalize"
          label="Core business is a product or service"
          value={data?.businessType}
        />
        <div className="flex flex-col gap-y-4xl">
          {productServiceFormQuestions.map((item) => (
            <AnswersTextDisplay
              key={item.field}
              label={item.question}
              value={get(data, item.field, "")}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
